import sys
import pandas as pd
import joblib
user_id = int(sys.argv[1])
model = joblib.load('model_mlp.pkl')
scaler = joblib.load('scaler.pkl')

# Cargar los datos desde el archivo Excel
file_path = '../../database/train_data/Fictitious_ECommerce_Data (1).xlsx'
df_orders = pd.read_excel(file_path, sheet_name='Orders')
df_order_items = pd.read_excel(file_path, sheet_name='OrderItems')
df_products = pd.read_excel(file_path, sheet_name='Products')
df_categories = pd.read_excel(file_path, sheet_name='Categories')
df_users = pd.read_excel(file_path, sheet_name='Users')

# Preprocesamiento similar al entrenamiento
df_products = pd.merge(df_products, df_categories, left_on='category', right_on='id', suffixes=('', '_category'))
df_order_items = pd.merge(df_order_items, df_products, left_on='product', right_on='id', suffixes=('', '_product'))
df_order_items['orderItemsCount'] = df_order_items.groupby('id')['product'].transform('count')
df_order_items['categories'] = df_order_items.groupby('id')['category'].transform(lambda x: ', '.join(set(x.astype(str))))
df_orders = pd.merge(df_orders, df_order_items[['id', 'orderItemsCount', 'categories']], left_on='orderItems', right_on='id', suffixes=('', '_order'))
df_orders = df_orders.drop_duplicates(subset=['orderItems'])

df_orders['dateOrdered'] = pd.to_datetime(df_orders['dateOrdered'])
df_orders['Year'] = df_orders['dateOrdered'].dt.year
df_orders['Month'] = df_orders['dateOrdered'].dt.month

# Filtrar las órdenes del usuario especificado
df_user_orders = df_orders[df_orders['user'] == user_id]

# Selecciona las características que usaste en el entrenamiento
X = df_orders[['user', 'Year', 'Month', 'orderItemsCount', 'categories', 'shippingAddress1', 'shippingAddress2', 'city', 'zip', 'country', 'phone', 'status']]
X = pd.get_dummies(X, columns=['user', 'categories', 'shippingAddress1', 'shippingAddress2', 'city', 'country', 'phone', 'status'], drop_first=True)

# Escalar las características
X = scaler.transform(X)

# Filtrar las características del usuario especificado
X_user = X[df_orders['user'] == user_id]

# Predecir con el modelo
predictions = model.predict(X_user)

# Obtener productos recomendados basados en predicciones (simulado)
recommended_products = df_products.sample(5)[['name', 'price', 'description']]

print(recommended_products.to_json(orient='records'))

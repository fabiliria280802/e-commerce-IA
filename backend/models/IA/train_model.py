import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import joblib

file_path = sys.argv[1]
df_orders = pd.read_excel(file_path, sheet_name='Orders')
df_order_items = pd.read_excel(file_path, sheet_name='OrderItems')
df_products = pd.read_excel(file_path, sheet_name='Products')
df_categories = pd.read_excel(file_path, sheet_name='Categories')
df_users = pd.read_excel(file_path, sheet_name='Users')

df_products = pd.merge(df_products, df_categories, left_on='category', right_on='id', suffixes=('', '_category'))
df_order_items = pd.merge(df_order_items, df_products, left_on='product', right_on='id', suffixes=('', '_product'))
df_order_items['orderItemsCount'] = df_order_items.groupby('id')['product'].transform('count')
df_order_items['categories'] = df_order_items.groupby('id')['category'].transform(lambda x: ', '.join(set(x.astype(str))))
df_orders = pd.merge(df_orders, df_order_items[['id', 'orderItemsCount', 'categories']], left_on='orderItems', right_on='id', suffixes=('', '_order'))
df_orders = df_orders.drop_duplicates(subset=['orderItems'])

df_orders['dateOrdered'] = pd.to_datetime(df_orders['dateOrdered'])
df_orders['Year'] = df_orders['dateOrdered'].dt.year
df_orders['Month'] = df_orders['dateOrdered'].dt.month

X = df_orders[['user', 'Year', 'Month', 'orderItemsCount', 'categories', 'shippingAddress1', 'shippingAddress2', 'city', 'zip', 'country', 'phone', 'status']].iloc[:100, :]
X = pd.get_dummies(X, columns=['user', 'categories', 'shippingAddress1', 'shippingAddress2', 'city', 'country', 'phone', 'status'], drop_first=True)
y = df_orders['totalPrice'].iloc[:100]

scaler = StandardScaler()
X = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

mlp = MLPRegressor(hidden_layer_sizes=(50, 20), max_iter=1000, random_state=42)
mlp.fit(X_train, y_train)
joblib.dump(mlp, 'model_mlp.pkl')
joblib.dump(scaler, 'scaler.pkl')

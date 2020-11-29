from django.urls import path
from . import views

urlpatterns =[
    path('', views.home,name='home'),
    path('<slug:product_slug>', views.productPage, name='product_detail'),
    path('cart/', views.cartPage, name='cart'),
    path('update_item/', views.updateItem, name='update_item'),

]


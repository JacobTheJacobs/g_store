from django.http import HttpResponse
from django.shortcuts import render
from .models import Product
from django.http import JsonResponse
import json


# Create your views here.
def home(request):
    products = None
    products = Product.objects.all().filter(available=True)
    return render(request, 'home.html', {'products': products})


def productPage(request, product_slug):
    try:
        product = Product.objects.get(slug=product_slug)
    except Exception as e:
        raise e
    return render(request, 'product.html', {'product': product})


def cartPage(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart={}
    items =[]
    print(cart)
    order ={'get_cart_total':0, 'get_cart_items':0, 'shipping':False}
    cartItems = order['get_cart_items']
    #loop thorough the items


    context = {'items':items, 'order':order, 'cartItems':cartItems}
    return render(request, 'cart.html',context)


def updateItem(request):
    return JsonResponse('Item was added', safe=False)

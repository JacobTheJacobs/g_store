from django.http import HttpResponse
from django.shortcuts import render
from .models import Product
from django.http import JsonResponse
import json
from . utils import cookieCart


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
    cookieData = cookieCart(request)
    cartItems = cookieData['cartItems']
    order = cookieData['order']
    items = cookieData['items']

    context = {'items': items, 'order': order, 'cartItems': cartItems}
    return render(request, 'cart.html', context)

def checkout(request):
    cookieData = cookieCart(request)
    cartItems = cookieData['cartItems']
    order = cookieData['order']
    items = cookieData['items']

    context = {'items': items, 'order': order, 'cartItems': cartItems}
    return render(request, 'cart.html', context)



def updateItem(request):
    return JsonResponse('Item was added', safe=False)

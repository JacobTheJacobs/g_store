import json
from . models import *

def cookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart = {[]}
    items = []
    total=0

    order = {'get_cart_total': 0, 'get_cart_items': 0, 'shipping': False}
    cartItems = order['get_cart_items']

    # loop thorough the items
    for i in cart:
        try:
            cartItems += cart[i]["quantity"]
            # get the item keys
            product = Product.objects.get(id=i)
            total += (product.price * cart[i]['quantity'])

            # updating order dictionary
            order['get_cart_total'] = total
            order['get_cart_items'] += cart[i]['quantity']

            item = {
                'product':{
                  'id':product.id,
                  'name':product.name,
                  'price':product.price,
                  'imageURL':product.image.url,
                },
                'quantity':cart[i]["quantity"],
                'get_total':total
            }
            items.append(item)

        except:
            pass
    return {'cartItems':cartItems,'order':order,'items':items}


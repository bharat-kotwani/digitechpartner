from django.shortcuts import render,render_to_response

# Create your views here.

#*******HTML REDIRECTS BEGIN******#
def index(request):
    return render_to_response('index.html',{})

def portfolio(request):
    return render_to_response('portfolio.html',{})

def aboutus(request):
    return render_to_response('aboutus.html',{})

#*******HTML REDIRECTS END******#

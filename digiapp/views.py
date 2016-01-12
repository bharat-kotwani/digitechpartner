from django.shortcuts import render,render_to_response

# Create your views here.

#*******HTML REDIRECTS BEGIN******#

def index(request):
    return render_to_response('index.html')

def portfolio(request):
    return render_to_response('portfolio.html',{})

def aboutus(request):
    return render_to_response('aboutus.html',{})

def contactus(request):
    return render_to_response('contact-us.html',{})

def enquiry(request):
    return render_to_response('enquiry.html',{})

def ourclients(request):
    return render_to_response('our-clients.html',{})

def webdesign(request):
    return render_to_response('web-designing.html',{})

def printmedia(request):
    return render_to_response('printmedia.html',{})

def ecommerce(request):
    return render_to_response('ecommerce.html',{})

def webdevelop(request):
    return render_to_response('web-development.html',{})

def softdevelop(request):
    return render_to_response('software-development.html',{})

def seoservices(request):
    return render_to_response('seoservices.html',{})

def services(request):
    return render_to_response('services.html',{})



def termcondition(request):
    return render_to_response('term&condition.html',{})

def disclaimers(request):
    return render_to_response('disclaimers.html',{})

def privacypolicy(request):
    return render_to_response('privacy-policy.html',{})

def robots(request):
    return render_to_response('robots',{})
#*******HTML REDIRECTS END******#

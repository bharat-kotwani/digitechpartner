"""DigitechPartner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'digiapp.views.index'),
    url(r'^index/', 'digiapp.views.index'),
    url(r'^web-portfolio/', 'digiapp.views.portfolio'),
    url(r'^about-us/', 'digiapp.views.aboutus'),
    url(r'^contact-us/','digiapp.views.contactus'),
    url(r'^enquiry/','digiapp.views.enquiry'),
    url(r'^our-clients/', 'digiapp.views.ourclients'),
    url(r'^web-designing/', 'digiapp.views.webdesign'),
    url(r'^web-development/', 'digiapp.views.webdevelop'),
    url(r'^e-commerce/', 'digiapp.views.ecommerce'),
    url(r'^print-media/', 'digiapp.views.printmedia'),
    url(r'^software-development/', 'digiapp.views.softdevelop'),
    url(r'^seo-services/', 'digiapp.views.seoservices'),
]

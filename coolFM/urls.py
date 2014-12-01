from django.conf.urls import patterns, include, url
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'coolFM.views.index'),
    url(r'^contact/','coolFM.views.index'),
    url(r'^programmation/','coolFM.views.index'),
    url(r'^animateurs/','coolFM.views.index'),
    #url(r'^admin/news_Manager/post/(?P<id>\d+)/preview/$', 'news_Manager.views.getPreviewPage'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^users/', include('user_Manager.urls')),
    url(r'^nouvelles/', include('news_Manager.urls')),
    url(r'^schedules/', include('schedules.urls')),
    url(r'^play/','coolFM.views.play'),
    url(r'^mailer/',include('mailer.urls')),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.STATICFILES_DIRS}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT}),
    #url(r'^ckeditor/', include('ckeditor.urls')),
)

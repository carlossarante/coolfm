# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Categories'
        db.create_table(u'news_Manager_categories', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('suptag', self.gf('django.db.models.fields.CharField')(max_length=140)),
        ))
        db.send_create_signal(u'news_Manager', ['Categories'])

        # Adding model 'Post'
        db.create_table(u'news_Manager_post', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=250)),
            ('slug', self.gf('django.db.models.fields.SlugField')(unique=True, max_length=50)),
            ('date_posted', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2014, 3, 14, 0, 0))),
            ('content_text', self.gf('django.db.models.fields.TextField')()),
            ('is_published', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('category', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['news_Manager.Categories'], null=True)),
            ('reads', self.gf('django.db.models.fields.BigIntegerField')(default=0)),
        ))
        db.send_create_signal(u'news_Manager', ['Post'])

        # Adding model 'Images'
        db.create_table(u'news_Manager_images', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('post', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['news_Manager.Post'])),
            ('img', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'news_Manager', ['Images'])


    def backwards(self, orm):
        # Deleting model 'Categories'
        db.delete_table(u'news_Manager_categories')

        # Deleting model 'Post'
        db.delete_table(u'news_Manager_post')

        # Deleting model 'Images'
        db.delete_table(u'news_Manager_images')


    models = {
        u'news_Manager.categories': {
            'Meta': {'object_name': 'Categories'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'suptag': ('django.db.models.fields.CharField', [], {'max_length': '140'})
        },
        u'news_Manager.images': {
            'Meta': {'object_name': 'Images'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'img': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'post': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['news_Manager.Post']"})
        },
        u'news_Manager.post': {
            'Meta': {'object_name': 'Post'},
            'category': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['news_Manager.Categories']", 'null': 'True'}),
            'content_text': ('django.db.models.fields.TextField', [], {}),
            'date_posted': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2014, 3, 14, 0, 0)'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_published': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'reads': ('django.db.models.fields.BigIntegerField', [], {'default': '0'}),
            'slug': ('django.db.models.fields.SlugField', [], {'unique': 'True', 'max_length': '50'}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '250'})
        }
    }

    complete_apps = ['news_Manager']
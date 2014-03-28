# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding unique constraint on 'Mails', fields ['email']
        db.create_unique(u'mailer_mails', ['email'])


    def backwards(self, orm):
        # Removing unique constraint on 'Mails', fields ['email']
        db.delete_unique(u'mailer_mails', ['email'])


    models = {
        u'mailer.mails': {
            'Meta': {'object_name': 'Mails'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2013, 11, 27, 0, 0)'}),
            'email': ('django.db.models.fields.EmailField', [], {'unique': 'True', 'max_length': '75'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['mailer']
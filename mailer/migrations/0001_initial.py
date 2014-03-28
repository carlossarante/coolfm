# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Mails'
        db.create_table(u'mailer_mails', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('date_joined', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime(2013, 11, 27, 0, 0))),
        ))
        db.send_create_signal(u'mailer', ['Mails'])


    def backwards(self, orm):
        # Deleting model 'Mails'
        db.delete_table(u'mailer_mails')


    models = {
        u'mailer.mails': {
            'Meta': {'object_name': 'Mails'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime(2013, 11, 27, 0, 0)'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['mailer']
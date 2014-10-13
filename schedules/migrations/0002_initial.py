# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Days'
        db.create_table(u'schedules_days', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('day', self.gf('django.db.models.fields.CharField')(max_length=10)),
        ))
        db.send_create_signal(u'schedules', ['Days'])

        # Adding model 'Shows'
        db.create_table(u'schedules_shows', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('show_name', self.gf('django.db.models.fields.CharField')(max_length=200)),
            ('show_pict', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
            ('about', self.gf('django.db.models.fields.TextField')()),
            ('starts', self.gf('django.db.models.fields.TimeField')()),
            ('ends', self.gf('django.db.models.fields.TimeField')()),
        ))
        db.send_create_signal(u'schedules', ['Shows'])

        # Adding M2M table for field participants on 'Shows'
        m2m_table_name = db.shorten_name(u'schedules_shows_participants')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('shows', models.ForeignKey(orm[u'schedules.shows'], null=False)),
            ('user', models.ForeignKey(orm[u'user_Manager.user'], null=False))
        ))
        db.create_unique(m2m_table_name, ['shows_id', 'user_id'])

        # Adding M2M table for field day on 'Shows'
        m2m_table_name = db.shorten_name(u'schedules_shows_day')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('shows', models.ForeignKey(orm[u'schedules.shows'], null=False)),
            ('days', models.ForeignKey(orm[u'schedules.days'], null=False))
        ))
        db.create_unique(m2m_table_name, ['shows_id', 'days_id'])


    def backwards(self, orm):
        # Deleting model 'Days'
        db.delete_table(u'schedules_days')

        # Deleting model 'Shows'
        db.delete_table(u'schedules_shows')

        # Removing M2M table for field participants on 'Shows'
        db.delete_table(db.shorten_name(u'schedules_shows_participants'))

        # Removing M2M table for field day on 'Shows'
        db.delete_table(db.shorten_name(u'schedules_shows_day'))


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'schedules.days': {
            'Meta': {'object_name': 'Days'},
            'day': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'schedules.shows': {
            'Meta': {'object_name': 'Shows'},
            'about': ('django.db.models.fields.TextField', [], {}),
            'day': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'days'", 'null': 'True', 'to': u"orm['schedules.Days']"}),
            'ends': ('django.db.models.fields.TimeField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'participants': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'announcers'", 'symmetrical': 'False', 'to': u"orm['user_Manager.User']"}),
            'show_name': ('django.db.models.fields.CharField', [], {'max_length': '200'}),
            'show_pict': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'starts': ('django.db.models.fields.TimeField', [], {})
        },
        u'user_Manager.user': {
            'Meta': {'object_name': 'User'},
            'bio': ('django.db.models.fields.TextField', [], {}),
            'birthday': ('django.db.models.fields.DateField', [], {}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'picture': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '100'})
        }
    }

    complete_apps = ['schedules']
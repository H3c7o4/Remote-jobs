# Generated by Django 4.2.13 on 2024-10-08 11:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.CharField(max_length=100, unique=True)),
                ('role', models.CharField(max_length=255)),
                ('company_name', models.CharField(max_length=255)),
                ('company_num_employees', models.CharField(blank=True, max_length=50, null=True)),
                ('location', models.CharField(max_length=255)),
                ('remote', models.BooleanField(default=False)),
                ('logo', models.URLField(blank=True, null=True)),
                ('url', models.URLField()),
                ('text', models.TextField()),
                ('date_posted', models.DateTimeField()),
                ('keywords', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='LikedJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=255)),
                ('company_name', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('logo', models.URLField(blank=True, null=True)),
                ('url', models.URLField()),
                ('text', models.TextField()),
                ('date_posted', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

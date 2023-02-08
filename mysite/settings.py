"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 4.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
import cloudinary_storage
from django.core.files.storage import FileSystemStorage
import dj_database_url
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-)oi-7teqo!w115=$*rlk&+o%-dm%f_&xawpw2!ew&mj)e=tl-%'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'backmkaly.app1',
    'corsheaders',
    'cloudinary',
    'cloudinary_storage'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://mkaly.vercel.app',
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': dj_database_url.parse(os.environ.get("DATABASE_URL"))
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = [
        'django.contrib.auth.backends.ModelBackend',
]

AUTH_USER_MODEL= "app1.User"

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'es-PE'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

USE_L10N = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'

MEDIA_URL = '/media/'
absolute_path = os.path.dirname(__file__)
MEDIA_ROOT = os.path.join(BASE_DIR, '/app1/static/media/images')
fs = FileSystemStorage(location=os.path.join(BASE_DIR, 'backmkaly/app1/static/media'))
#MEDIA_ROOT = os.path.join(absolute_path, '..backmkaly.app1.static', 'media')

#STATIC_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'static-only')

#STATICFILES_DIRS = (
#    os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'static'),
#)


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'mkalyempresabills@gmail.com'
EMAIL_HOST_PASSWORD = 'otszopumbgexzikd'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

CLOUDINARY_STORAGE={
    'CLOUD_NAME': 'dvm5lesco',
    'API_KEY': '442981974754588',
    'API_SECRET': '1wFfwa-szxeBtnIPFDpHG2hp-84'
}
DEFAULT_FILE_STORAGE='cloudinary_storage.storage.MediaCloudinaryStorage'

STRIPE_SECRET_KEY = "sk_test_51MVe1FGpB3JzZ9MsfMhUpJBBCFt7vFYBB65pjEAVL0PQah9ijekD0m7SjYBMvTXnHGIcGN2EFICE1sfdHwECDf8Q00AQNHRB5H"
STRIPE_PUBLIC_KEY = "pk_test_51MVe1FGpB3JzZ9Msw92mAPAJIrr7uHxjWDm4XdRx0By1PvMG5hXaMC6M3Lcu0aww6CeiZcpCZtI8OMYx6wWQLvmK00HFVOGN70"
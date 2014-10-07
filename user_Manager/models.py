from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager,Group

class User_Manager(BaseUserManager):
        def create_user(self, username, first_name,last_name, birthday, password=None):
       
            if not username:
                raise ValueError('Users must have an username')

            user = self.model(
                              username=username,
                              first_name=first_name,
                              last_name=last_name,
                              birthday=birthday,
                              )

            user.set_password(password)
            user.save(using=self._db)
            return user

        def create_superuser(self, username, first_name, last_name, birthday, password):
            """
            Creates and saves a superuser with the given email, date of
            birth and password.
            """
            user = self.create_user(username,
                                    first_name=first_name,
                                    last_name=last_name,
                                    password=password,
                                    birthday=birthday,
                                    )
            user.is_admin = True
            user.is_superuser=True
            user.save(using=self._db)
            return user

# Create your models here.
class User(AbstractBaseUser,PermissionsMixin):
    username = models.CharField(max_length=100,unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthday = models.DateField()
    picture = models.ImageField(upload_to='UserPictures')
    bio = models.TextField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    USERNAME_FIELD= 'username'
    REQUIRED_FIELDS= ['first_name','last_name','birthday']
    objects = User_Manager()
    @property
    def is_staff(self):
        return self.is_admin
    
    def get_full_name(self):
        return ('%s %s') % (self.first_name,self.last_name)
    def get_short_name(self):
        return ('%s %s') % (self.first_name,self.last_name)   
    def __unicode__(self):
        return self.username
    

        
class Contacts(models.Model):
    user = models.ForeignKey(User)
    email = models.EmailField(null=True)
    phone = models.BigIntegerField(null=True)
    fax = models.BigIntegerField(null=True)
    
    
class Presenter(models.Model):
    img = models.ImageField(upload_to='presenters_pic')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    bio = models.TextField()

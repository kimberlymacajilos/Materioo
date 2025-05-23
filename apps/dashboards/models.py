from django.db import models

# Create your models here.

class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class AlbumType(models.TextChoices):
    STUDIO = 'Studio', 'Studio'
    EP = 'EP', 'EP'
    COMPILATION = 'Compilation', 'Compilation'
    SINGLE = 'Single', 'Single'
    MIXTAPE = 'Mixtape', 'Mixtape'

class Album(BaseModel):
    title = models.CharField(max_length=200)
    release_date = models.DateField()
    album_type = models.CharField(max_length=20, choices=AlbumType.choices)
    language = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Song(BaseModel):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='songs')
    title = models.CharField(max_length=200)
    duration = models.DurationField()
    is_title_track = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Award(BaseModel):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='awards')
    name = models.CharField(max_length=200)
    year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} ({self.year})"
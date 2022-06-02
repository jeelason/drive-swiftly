from django.db import models
from django.urls import reverse

# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length=300)
    employee_number = models.PositiveIntegerField(null=True, unique=True)

    def __str__(self):
        return self.name
    
    def get_api_url(self):
        return reverse("api_list_technicians", kwargs={"pk": self.id})

class Appointment(models.Model):
    customer_name = models.CharField(max_length=200)
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=300)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    technician = models.ForeignKey("Technician", related_name="appointments", on_delete=models.PROTECT)
    reason = models.TextField()
    finished = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer_name} {self.vin}"

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True, null=True)
    vin = models.CharField(max_length=300)

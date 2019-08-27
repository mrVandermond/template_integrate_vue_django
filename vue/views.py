from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json

# Create your views here.
def index(request):
  data = [
    {
      "title": "Заголовок1",
      "pub_date": "2019-10-05",
      "text": "some text"
    },
    {
      "title": "Заголовок2",
      "pub_date": "2019-04-15",
      "text": "same text"
    },
    {
      "title": "Заголовок3",
      "pub_date": "2019-03-05",
      "text": "some text"
    },
    {
      "title": "Заголовок4",
      "pub_date": "2019-01-20",
      "text": "some text"
    },
    {
      "title": "Заголовок5",
      "pub_date": "2019-06-13",
      "text": "some text"
    },
    {
      "title": "Заголовок6",
      "pub_date": "2019-10-16",
      "text": "some text"
    },
    {
      "title": "Заголовок7",
      "pub_date": "2019-06-23",
      "text": "some text"
    }
  ]
  context = {
    'data': json.dumps(data),
  }
  return render(request, 'vue/index.html', context)
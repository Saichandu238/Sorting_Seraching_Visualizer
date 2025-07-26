# sortingapp/urls.py

# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.home, name='home'),
#     path('bubble-sort/',views.bubble_sort,name='bubble_sort'),
#     path('merge-sort/',views.merge_sort,name='merge_sort'),
#     path('quick-sort/',views.quick_sort,name='quick_sort'),    
# ]

from django.urls import path
from sortingapp import views

urlpatterns = [
    path('', views.home, name='home'),
    path('bubble-sort/', views.bubble_sort, name='bubble_sort'),
    path('merge-sort/', views.merge_sort, name='merge_sort'),
    path('quick-sort/', views.quick_sort, name='quick_sort'),
    path('insertion-sort/', views.insertion_sort, name='insertion_sort'),
    path('selection-sort/',views.selection_sort,name='selection_sort'),
    path('linear-search/',views.linear_search,name='linear_search'),
    path('binary-search/',views.binary_search,name='binary_search'),
    path('jump-search/',views.jump_search,name='jump_search'),
]

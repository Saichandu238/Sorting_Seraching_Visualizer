# from django.shortcuts import render

# def home(request):
#     return render(request, 'home.html')

# def bubble_sort(request):
#     return render(request, 'bubble_sort.html')

# def merge_sort(request):
#     return render(request, 'merge_sort.html')

# def quick_sort(request):
#     return render(request, 'quick_sort.html')


from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def bubble_sort(request):
    return render(request, 'bubble_sort.html')

def merge_sort(request):
    return render(request, 'merge_sort.html')

def quick_sort(request):
    return render(request, 'quick_sort.html')

def insertion_sort(request):
    return render(request, 'insertion_sort.html')

def selection_sort(request):
    return render(request,'selection_sort.html')

def linear_search(request):
    return render(request, 'linear_search.html')

def binary_search(request):
    return render(request,'binary_search.html')

def jump_search(request):
    return render(request,'jump_search.html')


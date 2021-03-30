import json
lst = []
for number in range(0, 20):
    if(number % 2 != 0):
        lst.append(number)
with open('data.json', 'w') as f:
    json.dump(lst, f, ensure_ascii=False, indent=4)

odd_numer= open('data.json',)
data = json.load(odd_numer)
print(data)

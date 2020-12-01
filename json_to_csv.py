import pandas as pd
from os import path

quotes_set = set()
authors_set = set()

authors_data = pd.read_json(path.join('quotes', 'quotes.json'))

start=0
for author_index, [author, quotes] in enumerate(authors_data.values):
    authors_set.add((author_index, author))
    for quote_index, quote in enumerate(quotes, start=start):
        start += 1
        quotes_set.add((quote_index, quote, author_index))

with open(path.join('quotes', 'quotes.csv'), 'w') as file:
    for item in quotes_set:
        file.write(f"{'|'.join(str(i) for i in item)}\n")

with open(path.join('quotes', 'authors.csv'), 'w') as file:
    for item in authors_set:
        file.write(f"{'|'.join(str(i) for i in item)}\n")


test_seed_size = 30 # number of authors in test data
selected_authors_id = [] # to filter quotes test data

with open(path.join('quotes', 'test', 'authors.csv'), 'w') as file:
    for index, item in enumerate(authors_set):
        if index > test_seed_size:
            break
        selected_authors_id.append(item[0])
        file.write(f"{'|'.join(str(i) for i in item)}\n")

with open(path.join('quotes', 'test', 'quotes.csv'), 'w') as file:
    for item in quotes_set:
        if item[2] in selected_authors_id:
            file.write(f"{'|'.join(str(i) for i in item)}\n")

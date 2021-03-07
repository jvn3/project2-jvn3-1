quantity = int(input("Enter Quantity "))
name = input("Enter Name ")
price = quantity * 100

discountedPrice = (price) - (0.1 * price)

if price >= 1000:
    print("Customer Name: " + name)
    print("With 10% discount, the price is " + str(discountedPrice))
    print('Regular Price: ' + str(price))
else:
    print("Cost is " + str(price))
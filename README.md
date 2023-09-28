# parking-API

###

API და დათაბეიზი გამართულია render.com-ზე.

\*იმისათვის რომ ვნახოთ API როგორ მუშაობს უნდა ვისარგებლოთ postman-ით.

1.რეგისტრაცია/signup:
რეგისტრაციის გასავლელად ვირჩევთ post და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/signup,
ხოლო raw-ში ვუთითებთ :
მაგ:
{
"firstName":"Jana",
"lastName":"Sirbiladze",
"email":"jana.sirbiladze17@gmail.com",
"password":"Artemisia"
}
set ღილაკის დაჭერით რექვესთი გაეშვება და წამატებული რეგისტრაციის შემთხვევაში დააბრუნებს მესიჯს: user signed up. Verification token sent და token-ს ვერიფიკაციისთვის. token-ს ვაკოპირებთ ვერიფიკაციისთვის გამოსაყენებლად.

2.ვერიფიკაცია
რეგისტრაციის გასავლელად ვირჩევთ post და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/verify,
ხოლო raw-ში ვუთითებთ : hash - რეგისტრაციისას რესპონსში მიღებულ token-ს და email-ში იმ მეილს რითაც გავიარეთ რეგისტრაცია.
მაგ:
{
"hash":"b5e2393ee238b453675723ec9addf0d4bc7246e0bf002df602086daa1aa5fa88c831bd1cce3974cce14bb4b58de21c3c",
"email":"jeronimo@gmail.com"
}

წარმატებულად ვერიფიცირების შემდეგ რესპონსად მივიღებთ: Email verified successfully.

3.login
მომხმარებლის დასალოგინებლად ვირჩევთ post და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/login,
ხოლო raw-ში ვუთითებთ password და email:
მაგ:
{
"email":"jana.sirbiladze17@gmail.com",
"password":"Artemisia"
}
წარმატებულად ვერიფიცირების შემდეგ რესპონსად მივიღებთ: successfully logged in

4.პაროლის აღდგენა
პაროლის აღსადგენად ვირჩევთ post და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/recovery,
ხოლო raw-ში ვუთითებთ email-s:
მაგ:
{
"email":"jana.sirbiladze17@gmail.com",
}
სწორი მეილის შემთხვევაში რესპონსად მოვა შეტყობინება: "Password reset email sent.", და recoveryToken
რომელსაც დავაკოპირებთ და გამოვიყენებთ პაროლის შეცვლის ეტაპის ბოლომდე მისაყვანად.

---

ამის შემდეგ postman-ზე ვირჩევთ post და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/reset,
ხოლო raw-ში ვუთითებთ ახალ password-ს და recoveryToken-ს რომელიც მივიღეთ პირველი/recovery ეტაპიდან.
მაგ:
{
"verificationHash":"8a79303e8a8d079f7c890f53e66a88ca91434d5f02bd007f8c3f28052468150f7b21f94007732581b39a665",
"password":"Alexandre12"
}
სწორი ვერიფიცირების შემთხვევაში(მეილზე გაგზავნილი token-ს დამთხვევისას) რესპონსად დააბრუნებს მესიჯს :Password updated successfully.

5.ავტომობილის დამატება
ავტომპობილის დასამატებლად ვირჩევთ post და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/usercar/:userId, სადაც :userId მაგივრად გადავცემთ მომხმარებლის id-ს რომელიც დაგვიბრუნდა ლოგინის რესპონსში,
ხოლო Header-ში ვუთითებთ content-type: application/json, Accept: application/json და
ავტორიზაციაში ვუთითებთ ტოკენს რომელიც ლოგინის რესპონსში მოგვივიდა მაგ:
Authorization: Beare eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6ImhhcmJpZWxpQGdtYWlsLm.
ხოლო raw-ში ვუთითებთ :
{
"carName":"toyota aqua",
"registrationPlate":"AB-123-BN", ამ ფორმატში უნდა იტოს თორემ დააერორებს
"type":"Sedan"

}

6.  ავტომობილის დააფდეითება
    ავტომპობილის დასააფდეიტებლად ვირჩევთ get და ვუთითებთ https://parking-m3z3.onrender.com/api/usercars/:userId,
    სადაც :userId მაგივრად გადავცემთ მომხმარებლის id-ს რომელიც დაგვიბრუნდა ლოგინის რესპონსში.
    რესპონსში ეს დაგვიბრეუნებს ყველა მანქანას თავისი მონაცემებით(მათშორის მანქანის აიდს) რომელიც გააჩნია კონკრეტულ მომხმარებელს.
    ამის შემდეგ,
    put და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/usercar/:carId, სადაც :carId მაგივრად გადავცემთ ავტომობილის id-ს რომელიც დაგვიბრუნდა get getUsersCars რექვესთით,
    ხოლო Header-ში ვუთითებთ content-type: application/json, Accept: application/json და
    ავტორიზაციაში ვუთითებთ ტოკენს რომელიც ლოგინის რესპონსში მოგვივიდა მაგ:
    Authorization: Beare eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6ImhhcmJpZWxpQGdtYWlsLm.
    ხოლო raw-ში ვუთითებთ :
    {
    "carName":"toyota corola",
    "registrationPlate":"AB-127-BN", ამ ფორმატში უნდა იტოს თორემ დააერორებს
    "type":"Sedan"

    } დააფდეითებისას სამივე მონაცემი ახლლიდან შეგვყავს.

        ავტომობილის ტიბი უნდა ემტხვეოდეს: (
              'Sedan', 'Sports car', 'Station wagon', 'Coupe',
              'Hatchback', 'Convertible', 'Minivan', 'Pickup truck',
              'Off-road vehicle', 'Luxury vehicle', 'Hybrid vehicle',
              'Limousine', 'Pony car', 'Electric car', 'Crossover', 'Truck', 'Microcar'
          )

    7.ავტომობილის წაშლა
    ავტომპობილის წასაშლელად ვირჩევთ delete და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/usercar/:carId, სადაც
    :carId მაგივრად გადავცემთ ავტომობილის id-ს რომელიც დაგვიბრუნდა get getUsersCars რექვესთით,
    ღილაკზე send დაჭერით წავშლით კონკრეტულ ავტომობილის.

7.  პარკინგის შესაქმნელად post და ვუთითებთ https://parking-m3z3.onrender.com/api/parkingZone,
    ხოლო raw-ში ვუთითებთ :
    {
    "parkingName":"nucubidze",
    "address":"nucubidze 128",
    "hourlyCost": 10.00

        }

    8.პარკინგის დასააფდეიტებლად get და ვუთითებთ https://parking-m3z3.onrender.com/api/parkingZone,
    რაც რესპონსად დააბრუნებს არსებულ პარკირებების მონაცემებს მათ შორის id-ს. რომელიც დაგვჭირდება კონლრეტული
    ზონის დასააფდეიტებლად

ამის შემდეგ, put და ვუთითებთ ლინკს: https://parking-m3z3.onrender.com/api/parkingZone/:parkingId,
:parkingId მაგივრად ვუთითებთ გეთ რექუესტის შედეგად დაბრუნებულ სასურველი ზონის id-ს.
ხოლო raw-ში ვუთითებთ :
{
"parkingName":"nucubidze",
"address":"nucubidze 138",
"hourlyCost": 10.00

    }

9. ზონის წაშლა
   ამისათვის ვუთითებთ delete და ლინკს: https://parking-m3z3.onrender.com/api/parkingZone/:parkingId
   :parkingId მაგივრად ვუთითებთ გეთ რექუესტის შედეგად დაბრუნებულ სასურველი ზონის id-ს.
   ღილაკზე sent დაჭერით წავშლით სასურველ ზონას.

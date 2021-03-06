var read = require('readline-sync');
var fs = require('fs');
class Address {
    constructor(city, state, zip) {
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
    getCity() {
        var city = read.question("Enter city name: ");
        var city_regex = /^[a-zA-Z ]{2,30}$/g;        //validation to take input for only alphabets
        if (!city.match(city_regex)) {
            console.log("Invalid name input")
            city = read.question("Please enter a valid city name: ");
        }
        this.setCity(city);
    }
    setCity(city) {
        // console.log(city);
        this.city = city;
    }
    updateCity(city) {
        var city = read.question("Enter city name: ");
        var city_regex = /^[a-zA-Z ]{2,30}$/g;        //validation to take input for only alphabets
        if (!city.match(city_regex)) {
            console.log("Invalid name input")
            city = read.question("Please enter a valid city name: ");
        }
        return this.city = city;
    }
    getState() {
        var state = read.question("Enter state: ");
        var state_regex = /^[a-zA-Z ]{2,30}$/g;        //validation to take input for only alphabets
        if (!state.match(state_regex)) {
            console.log("Invalid name input")
            state = read.question("Please enter a valid state name: ");
        }
        this.setState(state);
    }
    setState(state) {
        // console.log(state);
        this.state = state;
    }
    updateState() {
        var state = read.question("Enter state: ");
        var state_regex = /^[a-zA-Z ]{2,30}$/g;        //validation to take input for only alphabets
        if (!state.match(state_regex)) {
            console.log("Invalid name input")
            state = read.question("Please enter a valid state: ");
        }
        return this.state = state;
    }
    getZip() {
        var zip = read.question("Enter the zip code: ");
        var zip_regex = /^(\d{4}|\d{6})$/g;
        if (!zip.match(zip_regex)) {
            console.log("Invalid zipcode input")
            zip = read.question("Please enter a valid zipcode: ");
        }
        this.setZip(zip);
    }
    setZip(zip) {
        
        this.zip = zip;
    }
    updateZip() {
        var zip = read.question("Enter the zip code: ");
        var zip_regex = /^(\d{4}|\d{6})$/g;
        if (!zip.match(zip_regex)) {
            console.log("Invalid zipcode input")
            zip = read.question("Please enter a valid zipcode: ");
        }
        return this.zip = zip;
    }
}
class Person {

    constructor(name, phone, address) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
    getName() {
        var name = read.question("Enter name: ");
        var name_regex = /^[a-zA-Z ]{2,30}$/g;        //validation to take input for only alphabets
        if (!name.match(name_regex)) {
            console.log("Invalid name input")
            name = read.question("Please enter a valid name: ");
        }
        this.setName(name);
    }
    setName(name) {
        
        this.name = name;
    }
    getPhone() {
        var phone = read.question("Enter phone number: ");
        var phone_regex = /^(\+\d{1,3}[- ]?)?\d{10}$/       //validation to take input for proper mobile number of 10-digit with country code
        if (!phone.match(phone_regex)) {
            console.log("Invalid Mobile Number")
            phone = read.question("Please enter a valid mobile number: ");
        }
        this.setPhone(phone);
    }
    setPhone(phone) {
        
        this.phone = phone;
    }
    updatePhone() {
        var phone = read.question("Enter phone number: ");
        var phone_regex = /^\+\d{1,3}-\d{10}$/       //validation to take input for proper mobile number of 10-digit with country code
        if (!phone.match(phone_regex)) {
            console.log("Invalid Mobile Number")
            phone = read.question("Please enter a valid mobile number: ");
        }
        return this.phone = phone;
    }
    getAddress() {

        var ad = new Address();
        console.log("Enter Address: ")
        ad.getCity();
        ad.getState();
        ad.getZip();
        this.setAddress(ad);
    }
    setAddress(address) {

        this.address = address;

    }
    updateAddress() {
        var ad = new Address();
        console.log("Enter Address: ")
        ad.updateCity();
        ad.updateState();
        ad.updateZip();
        return this.address = ad;
    }
}


console.log();



console.log("Press 1 TO ENTER RECORDS INTO ADDRESS BOOK");
console.log("Press 2 TO UPDATE EXISTING RECORD ");
console.log("Press 3 TO DELETE A RECORD");
console.log("Press 4 TO VIEW EXISTING RECORDS");
console.log("Press 5 TO SORT ACCORDING TO NAME");
console.log("Press 6 TO SORT ZIPCODE WISE");
console.log("Press 7 EXIT");

var choice = read.question("Choose your option : ");

switch (choice) {
    case '1': var person = new Person();
        var data = fs.readFileSync('/home/gourav/JAVASCRIPT/oops/main/addressBook.json')
        var obj = JSON.parse(data);
        person.getName();
        person.getPhone();
        person.getAddress();
        obj.contact.push(person);
        fs.writeFile('/home/gourav/JAVASCRIPT/oops/main/addressBook.json', JSON.stringify(obj), 'utf-8', function (err) {
            if (err) throw err
            console.log(' Successfully Updated....!')
        })
        break;
      
    case '2': var person = new Person();
        var data = fs.readFileSync('/home/gourav/JAVASCRIPT/oops/main/addressBook.json')
        var obj = JSON.parse(data);
        console.log(obj);
        var index = read.question("Which contact you want to update?  ");
        var option = read.question("What do you want to update?: \nPress 1 for updating phone number \nPress 2 for updating address  ");
        switch (option) {
            case '1': obj.contact[index].phone = person.updatePhone();
                fs.writeFile('/home/gourav/JAVASCRIPT/oops/main/addressBook.json', JSON.stringify(obj), 'utf-8', function (err) {
                    if (err) throw err
                    console.log('Contact updated successfully!')
                })
                break;
            case '2': obj.contact[index].address = person.updateAddress();
                fs.writeFile('/home/gourav/JAVASCRIPT/oops/main/addressBook.json', JSON.stringify(obj), 'utf-8', function (err) {
                    if (err) throw err
                    console.log('Contact updated successfully!')
                })
                break;
        }
        break;
    case '3': var person = new Person()
        var data = fs.readFileSync('/home/gourav/JAVASCRIPT/oops/main/addressBook.json')
        var obj = JSON.parse(data);
        console.log(obj);
        var index = read.question("Enter the name of the contact you want to Delete : ?  ");
        for (var i = 0; i < obj.contact.length; i++) {
            if (index === obj.contact[i].name) {
                obj.contact.splice(i, 1);
            }
        }
        //obj.contact.splice(index, 1);
        fs.writeFile('/home/gourav/JAVASCRIPT/oops/main/addressBook.json', JSON.stringify(obj), 'utf-8', function (err) {
            if (err) throw err
            console.log('Contact deleted successfully!')
        })
        break;
    case '4': var data = fs.readFileSync('/home/gourav/JAVASCRIPT/oops/main/addressBook.json')
        var obj = JSON.stringify(JSON.parse(data));
        console.log(obj);
        break;
    case '5':
        var data = fs.readFileSync('/home/gourav/JAVASCRIPT/oops/main/addressBook.json')
        var obj = JSON.parse(data);


        function compare(a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }

        console.log(obj.contact.sort(compare));
        break;

    case '6': var data = fs.readFileSync('/home/gourav/JAVASCRIPT/oops/main/addressBook.json')
        var obj = JSON.parse(data);

        function compare(a, b) {
            if (a.zip < b.zip)
                return -1;
            if (a.zip > b.zip)
                return 1;
            return 0;
        }

        console.log(obj.contact.sort(compare));
        break;
    case '7':console.log("........Thank YOU have a Nice Day.......")
     process.exit();
    default: console.log("Invalid Option!!!");
        break;
}

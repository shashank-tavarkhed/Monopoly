import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesConstantService {
  places = [
    {
      name: "START",
      type: "CHECKPOINT",
      price: 1500,
    },
    {
      name: "NEW DELHI",
      type: "CITY",
      price: 8000,
      upgrades:[800,2000,4000,8000],
      current_upgrade: 0,
      houseCost: 8500,

    },
    {
      name: "PUNE",
      type: "CITY",
      price: 6500,
      upgrades:[650,1650,3250,6500],
      current_upgrade: 0,
      houseCost: 7000,
    },
    {
      name: "TIRUPATI",
      type: "CITY",
      price: 2000,
      upgrades:[200,500,1000,2000],
      current_upgrade: 0,
      houseCost: 2500,
    },
    {
      name: "COMMUNITY CHEST",
      type: "CHEST/CHANCE",
      rules:'If dice roll is EVEN then bank will pay you diceroll times ₹50 OR If dice roll is ODD then you need to pay diceroll times ₹50 to the bank.',
      price: 1000,
    },
    {
      name: "AIRWAYS",
      type: "BUSINESS",
      price: 10500,
      rent: 2500,
    },
    {
      name: "OOTY",
      type: "CITY",
      price: 2200,
      upgrades:[200,550,1100,2200],
      current_upgrade: 0,
      houseCost: 2700,
    },
    {
      name: "HYDERABAD",
      type: "CITY",
      price: 5000,
      upgrades:[800,1000,1200,2000],
      current_upgrade: 0,
      houseCost: 4500,
    },{
      name: "GOA",
      type: "CITY",
      price: 4000,
      upgrades:[400,1000,2000,4000],
      current_upgrade: 0,
      houseCost: 4500,
    },{
      name: "HOSPITAL",
      type: "BUSINESS",
      price: 12500,
      rent: 2500,
    }
    , {
      name: "JAIL",
      type: "CHECKPOINT",
      price:500
    },
    {
      name: "RAILWAYS",
      type: "BUSINESS",
      price: 10500,
      rent: 2500,
    },{
      name: "CHENNAI",
      type: "CITY",
      price: 7000,
      upgrades:[700,1750,3500,7000],
      current_upgrade: 0,
      houseCost: 7500,
    },
    {
      name: "CHANCE",
      type: "CHEST/CHANCE",
      rules:'If dice roll is ODD then bank will pay you diceroll times ₹50 OR If dice roll is EVEN then you need to pay diceroll times ₹50 to the bank.',
      price: 750,
    },{
      name: "SHIMLA",
      type: "CITY",
      price: 3500,
      upgrades:[800,900,1750,3500],
      current_upgrade: 0,
      houseCost: 8000,

    }, {
      name: "SHOPPING MALL",
      type: "BUSINESS",
      price: 10500,
      rent: 2500,
    },{
      name: "AMRITSAR",
      type: "CITY",
      price: 4000,
      upgrades:[400,1000,2000,4000],
      current_upgrade: 0,
      houseCost: 4500,
    },{
      name: "BENGALURU",
      type: "CITY",
      price: 5500,
      upgrades:[550,1400,2750,5500],
      current_upgrade: 0,
      houseCost: 6000,
    },
    {
      name: "CONSTRUCTION",
      type: "BUSINESS",
      price: 2000,
      rent: 500,
    },{
      name: "LADAKH",
      type: "CITY",
      price: 4000,
      upgrades:[400,1000,1500,2500],
      current_upgrade: 0,
      houseCost: 2500,
    },
    {
      name: "REST HOUSE",
      type: "CHECKPOINT",
      price: 1500
    },
    {
      name: "CHANDIGARH",
      type: "CITY",
      price: 4500,
      upgrades:[450,1150,2250,4500],
      current_upgrade: 0,
      houseCost: 5000,
    },{
      name: "MUMBAI",
      type: "CITY",
      price: 8500,
      upgrades:[800,2150,4250,8500],
      current_upgrade: 0,
      houseCost: 9000,


    },
    {
      name: "PETROL",
      type: "BUSINESS",
      price: 3000,
      rent: 300,
    },{
      name: "DARJEELING",
      type: "CITY",
      price: 2000,
      upgrades:[200,500,1000,2000],
      current_upgrade: 0,
      houseCost: 2500,
    },{
      name: "COMMUNITY CHEST",
      type: "CHEST/CHANCE",
      rules:'If dice roll is EVEN then bank will pay you diceroll times ₹50 OR If dice roll is ODD then you need to pay diceroll times ₹50 to the bank.',

      price: 1000,
    },{
      name: "INDORE",
      type: "CITY",
      price: 3000,
      upgrades:[300,750,1500,3000],
      current_upgrade: 0,
      houseCost: 3500,
    },
    {
      name: "COCHIN",
      type: "CITY",
      price: 3300,
      upgrades:[300,850,1650,3300],
      current_upgrade: 0,
      houseCost: 3800,
    },{
      name: "SHIPPING",
      type: "BUSINESS",
      price: 5500,
      rent: 750,
    },
    {
      name: "AUTO CARE",
      type: "BUSINESS",
      price: 2500,
      rent: 250,
    },{
      name: "DANCE CLUB",
      type: "CHECKPOINT",
      price: 500,
    },{
      name: "JAIPUR",
      type: "CITY",
      price: 2500,
      upgrades:[250,550,1000,2000],
      current_upgrade: 0,
      houseCost: 2500,
    },{
      name: "TRANSPORT",
      type: "BUSINESS",
      price: 3500,
      rent: 350,
    },{
      name: "AHEMDABAD",
      type: "CITY",
      price: 8000,
      upgrades:[800,1900,3750,7500],
      current_upgrade: 0,
      houseCost: 8000,


    },{
      name: "CHANCE",
      type: "CHEST/CHANCE",
      rules:'If dice roll is ODD then bank will pay you diceroll times ₹50 OR If dice roll is EVEN then you need to pay diceroll times ₹50 to the bank.',
      price: 750,
    },{
      name: "AGRA",
      type: "CITY",
      price: 3000,
      upgrades:[300,750,1500,3000],
      current_upgrade: 0,
      houseCost: 3500,
    },
    {
      name: "GUWAHATI",
      type: "CITY",
      price: 2500,
      upgrades:[250,650,1250,3500],
      current_upgrade: 0,
      houseCost: 3000,
    },{
      name: "RESORT",
      type: "BUSINESS",
      price: 7000,
      rent: 750,
    },
    {
      name: "KOLKATA",
      type: "CITY",
      price: 6000,
      upgrades:[600,1500,3000,6000],
      current_upgrade: 0,
      houseCost: 6500,
    },
    {
      name: "MYSORE",
      type: "CITY",
      price: 4000,
      upgrades:[400,800,1250,2000],
      current_upgrade: 0,
      houseCost: 4000,
    },
  ]
  constructor() {
    this.places.forEach((el:any,i)=>{
      el['id']=i;
      if (!el.bought && el.type !=='CHECKPOINT' && el.type !=='CHEST/CHANCE'){
      el['bought']=false;
      // el['owner'] = 1;
      // el['color'] = 'green';
      el['upgradable'] =false;
     }
    })
  }
}

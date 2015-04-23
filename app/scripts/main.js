
'use strict';
$('document').ready(function(){
	
	var people = [];
	var peopleOwing = [];
	var peopleOwed = [];
	var indexOwing = 0;
	var grandTotal = 0;
	var meanSpend = 0;
	var outputString = '';


	function Person (nom,spent){
		this.nom = nom;
		this.spent = spent;
		people.push(this);
	}

	var Matt = new Person ('Matt', 100);
	var Belinda = new Person('Belinda', 20);
	var Wayne = new Person('Wayne',30);
	var Nat = new Person('Nat',90);
	var Zara = new Person('Zara',50);
	var Tim = new Person('Tim',10);

	for (var i=0;i<people.length;i += 1){
		$('#costs').append('<tr><td>' + people[i].nom + '</td><td>' + people[i].spent + '</td></tr>');
		grandTotal += people[i].spent;
	}
	$('#grandTote').append(' $' + grandTotal);

	$('#splitter').click(function(){
		//Find mean spend and divide people into those who owed and owing
		meanSpend = +(grandTotal/people.length).toFixed(2);
		console.log('Mean spend: ' + meanSpend);
		for (var i=0;i<people.length;i+=1){
			if(people[i].spent < meanSpend){
				peopleOwing.push(people[i]);
			}else if (people[i].spent > meanSpend){ 
				peopleOwed.push(people[i]);
			}
		}

		//Sort according to size of debt/ credit

		function compare(a,b){
			if(a.spent<b.spent){ return -1};
			if(a.spent>b.spent) {return 1};
			return 0;
		}
		peopleOwing.sort(compare);
		peopleOwed.sort(compare);
		peopleOwed.reverse();

	
		while (peopleOwing.length > 0 && peopleOwed.length > 0){
			var currentOwing = meanSpend - peopleOwing[indexOwing].spent;
			console.log('current owing: ' + currentOwing);
			var currentOwed = peopleOwed[0].spent - meanSpend;
			
			if (currentOwing > currentOwed){
				peopleOwing[indexOwing].spent += currentOwed;
				peopleOwing.sort(compare);
				outputString += peopleOwing[indexOwing].nom + ' owes ' + peopleOwed[0].nom + ' $' + currentOwed.toFixed(2) +'\n';
				peopleOwed = peopleOwed.slice(1);
				console.log(outputString);
				continue;
			}
			else if (currentOwing < currentOwed){
				peopleOwing[indexOwing].spent = meanSpend;
				peopleOwed[0].spent -= currentOwing;
				peopleOwed.sort(compare);
				peopleOwed.reverse();
				outputString += peopleOwing[indexOwing].nom + ' owes ' + peopleOwed[0].nom + ' $' + currentOwing.toFixed(2) +'\n';
				peopleOwing = peopleOwing.slice(1);
				console.log(outputString);
				continue;
			}
			else if (currentOwing === currentOwed){
				peopleOwing[indexOwing].spent = meanSpend;
				peopleOwed[0].spent = meanSpend;
				outputString += peopleOwing[indexOwing].nom + ' owes ' + peopleOwed[0].nom + ' $' + currentOwing.toFixed(2) +'\n';
				peopleOwed = peopleOwed.slice(1);
				peopleOwing = peopleOwing.slice(1);
				
			}
			else{
				alert('something weird');
			}
			
		}
		
		console.log(outputString);

	});



});
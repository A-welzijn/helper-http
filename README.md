# A-Welzijn Helper-Http

v1.0.2

### Hoe het te gebruiken

```javascript
"dependencies": {
	"awelzijn-helper-http": "latest"
 }
```
```javascript
var app = angular.module('yourApp', [
	'awelzijn.helperhttp'
]);
```

Je injecteert de service in je controller
```javascript
var controller = function (httphelper) {...}
controller.$inject = ['aWelzijnHelperHttp'];
```

Je gebruikt de volgende methodes
```javascript
httphelper.get(url);
httphelper.post(url, data);
httphelper.put(url, data);
httphelper.delete(url);
```

Voor deze calls kan je een object meegeven met bepaalde opties.

####Params

```javascript
var options = { params: { id: 999, titel:'test' } };
return httphelper.get('https://test.com', options);
 ```
 Voert een GET request uit naar de url `https://test.com?id=999&titel=test`

####Transform

```javascript
			var options = {
				transform: function (response) {
					var personen = [];

					angular.forEach(response.list, function (persoon) {
						personen.push({
							id: persoon.id,
							naam:persoon.naam + ' ' + persoon.voornaam
						});
					});
					return personen;
				}
			};
```
Dit is een tussenstap om data van een externe bron te vertalen naar een object die de controller beter begrijpt.
Het `response` object dat binnekomt is het antwoord van de http call, de `return` in de transform komt binnen in de controller die deze methode heeft aangesproken.
 
 
####Error handling

Indien er een fout optreedt tijdens de call worden deze automatisch afgehandeld en wordt de gebruiker hiervan op de hoogte gebracht met een [notification-callout](https://github.com/A-welzijn/notification-callout)
via de [notification-service](https://github.com/A-welzijn/notification-service).
Optioneel kan je zelf ook errors opvangen en afhandelen.

```javascript
ctrl.loading = true;
service.get(id).then(function (response) {
						ctrl.data = response;
					}).finally(function () {
						ctrl.loading = false;
					});
```
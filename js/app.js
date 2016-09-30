'use strict'

$(document).foundation()

var showModal = function (title, content) {
	$('#gettaconModal .modal-title').html(title)
	$('#gettaconModal .modal-content').html(content)
	$('#gettaconModal').foundation('open');
}

var gettaconStart 	= {}, 
	htmlDays 		= document.querySelector('#days'), 
	htmlHours 		= document.querySelector('#hours'), 
	htmlMinutes 	= document.querySelector('#minutes')

/*	Colaboración de Edgar Boch*/
var gettaconCountdown = function () {
	var deadline = new Date('10/01/2016 18:00 GMT-0600')
    var currentTime = new Date()
    var diff        = deadline - currentTime
    var diff_seg    = Math.floor(diff / 1000)
    var seg         = diff_seg % 60
    var minutes     = Math.floor(diff_seg / 60) % 60
    var hours       = Math.floor(diff_seg / 3600) % 24
    var days        = Math.floor(diff_seg / 84400)

   	htmlDays.children[0].innerText 		= days
   	htmlHours.children[0].innerText 	= hours
   	htmlMinutes.children[0].innerText 	= minutes

   	//	Days, minutes and hours plural and singular condition
   	var daysText 	= (parseInt(days) === 1) ? 'Día' : 'Días'
   	var hoursText 	= (parseInt(hours) === 1) ? 'Hora' : 'Horas'
   	var minutesText = (parseInt(minutes) === 1) ? 'Minuto' : 'Minutos'
   	htmlDays.children[1].innerText 		= daysText
   	htmlHours.children[1].innerText 	= hoursText
   	htmlMinutes.children[1].innerText 	= minutesText

   	//	Updating the minutes chart, each time the second change, the chart does to
   	var minutesCounter = parseInt(100 * (parseInt(seg)) / 60)
   	htmlMinutes.setAttribute('data-percent', minutesCounter)
   	charts[2].update(minutesCounter)

   	//	Updating the hours chart, each time the minute change, the chart does to
   	if (minutes === 0) {
   		var hoursCounter = parseInt(100 * (parseInt(minutes)) / 24)
	   	htmlHours.setAttribute('data-percent', hoursCounter)
	   	charts[1].update(hoursCounter)

	   	if (hours === 0) {
	   		var daysCounter = parseInt(100 * (parseInt(hours)) / 7)
		   	htmlHours.setAttribute('data-percent', daysCounter)
		   	charts[0].update(daysCounter)
	   	}
   	}
   	console.log(hours)
   	if (days < 0 && hours < 0) {
   		gettaconStart.status = 'proceso'
   		if (Math.abs(hours) >= 12) {
   			gettaconStart.status = 'finalizo'
   		}
   	}
}

window.addEventListener('DOMContentLoaded', function () {
	var interval = setInterval(function () {
		gettaconCountdown()
        if (gettaconStart.status) {
        	clearInterval(interval)

        	charts[0].update(0)
        	charts[1].update(0)
        	charts[2].update(0)

        	htmlDays.children[0].innerText 		= 0
		   	htmlHours.children[0].innerText 	= 0
		   	htmlMinutes.children[0].innerText 	= 0

		   	if (gettaconStart.status == 'proceso') {
		   		showModal('La GETTACON INICIÓ', 'Gracias por formar parte de la primer gettacon :)')
		   	} else {
		   		showModal('La GETTACON FINALIZÓ', 'Gracias por haber formado parte de la primer gettacon :), eres genial solo por eso')
		   	}
        }
    }, 1000);
})

/* STUDENT APPLICATION */
$(function() {
	// start new MVC code
	var student = {// Create a new student model
		data: [
			{name:"Slappy the Frog",attendance:[],missing:0},
			{name:"Lilly the Lizard",attendance:[],missing:0},
			{name:"Paulrus the Walrus",attendance:[],missing:0},
			{name:"Gregory the Goat",attendance:[],missing:0},
			{name:"Adam the Anaconda",attendance:[],missing:0}
		],
		init: function (numberOfDays) {
			if (!localStorage.studentAttendance) {
		        console.log('Creating student model records...');
		        function getRandom() {
		            return (Math.random() >= 0.5);
		        };
		        for (var s = 0; s < this.data.length; s++) {
		            for (var i = 0; i <= numberOfDays; i++) {
		                var blnAtt = getRandom();
		            	this.data[s].attendance.push(blnAtt);
		            	if (blnAtt == false) this.data[s].missing ++;
		            }
		        };
				localStorage.studentAttendance = JSON.stringify(this.data);
		    } else {
		    	//initialize student data from localstorage
		    	console.log('Populating student model from local storage...');
		    	this.data = JSON.parse(localStorage.studentAttendance)
		    }
		},
		getAllStudents: function () {
			return this.data;
		},
		updateStudentAttendace: function (sIdx,attIdx,attVal) {
			this.data[sIdx].attendance[attIdx] = attVal;
			if (attVal == true) {
				this.data[sIdx].missing++;
			} else {
				this.data[sIdx].missing--;
			}
		},
		updateStudentName: function (sIdx,name) {
			this.data[sIdx].name = name;
		},
		getStudentMissingInfo: function(sIdx) {
			return this.data[sIdx].missing;
		}
		
	}

	var controller = {
		numberOfDays: 11,
		init: function () {
			student.init(this.numberOfDays);
			console.log("Students initialized: " + JSON.stringify(student.data));
			attendanceView.init();
		},
		getAllStudentInfo: function() {
			return student.getAllStudents();
		},
		setStudentAttendance: function(sIdx,attIdx,attVal) {
			student.updateStudentAttendace(sIdx, attIdx, attVal);
		},
		getStudentMissingInfo: function(sIdx) {
			return student.getStudentMissingInfo(sIdx);
		}
			
	}
	
	var attendanceView = {
		init: function () {
			var studentInfo = controller.getAllStudentInfo();
			var studentTable = document.getElementById('newTable').getElementsByTagName('tbody')[0];
			// Consider adding thead here
			for (var s = 0;s < studentInfo.length;s++) {
				var studentRow = studentTable.insertRow(-1);
				studentRow.setAttribute("class","student");
				var studentNameCell = studentRow.insertCell(-1);
				studentNameCell.setAttribute("class","name-col");
				studentNameCell.textContent = studentInfo[s].name;
				var daysMissed = 0;
				for (var i=0;i < studentInfo[s].attendance.length;i++) {
					var studentAttndCell = studentRow.insertCell(-1);
					var attendCheckbox = document.createElement("input");
					attendCheckbox.setAttribute("type","checkbox");
					if (studentInfo[s].attendance[i] == true) {
						attendCheckbox.setAttribute("checked","checked");
					} else {
						daysMissed++;
					}
					studentAttndCell.appendChild(attendCheckbox);
				}
				var studentMissedCell = studentRow.insertCell(-1);
				studentMissedCell.setAttribute("class","missed-col");
				studentMissedCell.textContent = daysMissed;
			}
			$allCheckboxes = $('tbody input');
			$allCheckboxes.on('click', function() {
		    	  var thisCell = $(this).parent();
		    	  var thisRow = thisCell.parent();
		    	  var countCell = $(thisRow).find('td:last');
		          var rowIdx = thisRow.index();
		          var colIdx = thisCell.index()-1;//subtract 1 to use to update attendance array in student model
		    	  console.log('Checkbox clicked. Student: ' + rowIdx + ', Day: ' + colIdx + ', missed? ' + !$(this).prop('checked'));
		    	  controller.setStudentAttendance(rowIdx, colIdx, !$(this).prop('checked'));
		    	  $(countCell).html(controller.getStudentMissingInfo(rowIdx));
		    });
		}
	}
	controller.init();
	
	// End MVC code
	
}());

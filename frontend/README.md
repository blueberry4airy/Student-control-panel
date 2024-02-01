# Student-control-panel         
<img
  src="https://www.freepnglogos.com/uploads/html5-logo-png/html5-logo-best-web-design-psd-html-cms-development-ecommerce-6.png"
  style="display: inline-block; width: 100px; height: 40px">

Student control panel, in which are located: 

---- Table with students with filters and sorting,  
---- Form for adding a new student.


* To add students, a form with fields corresponding to the student's data is displayed on the page. The form is validated according to the following rules:

---- All fields are required after applying the trim() method to the value;

---- The date of birth ranges from 01.01.1900 to the current date;

---- The year of the beginning of training is in the range from 2000 to the current year.

---- The data from the array is displayed in tabular form. Each row of the table contains information about one student. 

---- The age is calculated from the date of birth.


* It is believed that all students study for four years, that is, the range with years of study is displayed as {year of beginning of study}-{+4 years}. If September of the year of graduation has already passed, "finished" is displayed in parentheses instead of specifying the course.


* Before the table, there are displayed filters. If there are any changes in the filtering fields, the contents of the table change according to the specified filters. If several filters are specified, all of them are applied to the array of students in turn.

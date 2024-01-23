document.addEventListener('DOMContentLoaded', function () {

  //date base
  let studentsArr = [
    {
      surname: 'Gorincioi',
      name: 'Olga',
      middleName: 'Veaceslav',
      dateOfBirth: '04.01.1998',
      yearStart: '2017',
      faculty: 'LEA'
    },
    {
      surname: 'Gomez',
      name: 'Hanna',
      middleName: 'Henry',
      dateOfBirth: '12.03.1993',
      yearStart: '2010',
      faculty: 'Philosophy'
    },
    {
      surname: 'Fox',
      name: 'Jenny',
      middleName: 'Benny',
      dateOfBirth: '20.09.2000',
      yearStart: '2020',
      faculty: 'Arts'
    },
    {
      surname: 'Gibrish',
      name: 'Lyle',
      middleName: 'Ash',
      dateOfBirth: '24.12.1995',
      yearStart: '2014',
      faculty: 'Law'
    },
    {
      surname: 'Batton',
      name: 'Benjamin',
      middleName: 'Frady',
      dateOfBirth: '02.03.2005',
      yearStart: '2023',
      faculty: 'Musics'
    }
  ]

  let sortColumnFlag = 'fullName';
  let sortDirFlag = true

  // :::::::::::::::::::::::::::::::::::adding to DOM:::::::::::::::::::::::::::::::::

  const $addForm = document.querySelector('.student-form'),
    $name = document.getElementById('name'),
    $surname = document.getElementById('surname'),
    $middleName = document.getElementById('middleName'),
    $dateOfBirth = document.getElementById('dateOfBirth'),
    $studyYearStart = document.getElementById('studyYearStart'),
    $faculty = document.getElementById('faculty');

  const $tableBody = document.getElementById('addTableStudent');

  const $sortFullName = document.getElementById('thFullName'),
    $sortFaculty = document.getElementById('thFaculty'),
    $sortDateOfBirth = document.getElementById('thDateOfBirth'),
    $sortYearStudy = document.getElementById('thYearStudy');

  const $filterForm = document.querySelector('.filter-form'),
    $filterFullName = document.getElementById('filterFullName'),
    $filterFaculty = document.getElementById('filterFaculty'),
    $filterYearS = document.getElementById('filterYearStart'),
    $filterYearE = document.getElementById('filterYearEnd');


  // :::::::::::::::::::::::::::::::::::functions:::::::::::::::::::::::::::::::::

  // Validate date of birth
  function isValidDateOfBirth(date) {
    const minValidDate = new Date('1900-01-01');
    const maxValidDate = new Date();

    return date >= minValidDate && date <= maxValidDate;
  }


  //calculate the age of the student
  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString.split('.').reverse().join('-'));

    if (birthDate > today || birthDate.getFullYear() < 1900) {
      alert('Introduce a valid date of birth');
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }


  //calculate years of study
  function getYears(startYear) {
    const currentDate = new Date();
    const endYear = startYear + 4;
    const grade = currentDate.getFullYear() - startYear - (currentDate.getMonth() >= 8 ? 1 : 0);

    let result;
    if (grade > 4) {
      result = `${startYear}-${endYear} (finished)`;
    } else {
      result = `${startYear}-${endYear} (${grade} course)`
    }
    return result;
  }


  //create student row in the table
  function createStudentTr(oneStudent) {
    const $studentTr = document.createElement('tr'),
      $studentFullName = document.createElement('th'),
      $studentAge = document.createElement('th'),
      $studentStudyYears = document.createElement('th'),
      $studentFaculty = document.createElement('th');

    $studentFullName.textContent = oneStudent.fullName;
    $studentFaculty.textContent = oneStudent.faculty;
    $studentAge.textContent = oneStudent.dateOfBirth + ' (' + oneStudent.age + ')';
    $studentStudyYears.textContent = oneStudent.studyYears;


    $studentTr.append($studentFullName);
    $studentTr.append($studentFaculty);
    $studentTr.append($studentAge);
    $studentTr.append($studentStudyYears);

    return $studentTr
  }

  // Function to filter students
  function filterStudents(oneStudent) {
    const fullNameMatch = oneStudent.fullName.toLowerCase().includes($filterFullName.value.trim().toLowerCase());
    const facultyMatch = oneStudent.faculty.toLowerCase().includes($filterFaculty.value.trim().toLowerCase());
    const yearSMatch = oneStudent.studyYears.includes($filterYearS.value.trim());
    const yearEMatch = oneStudent.studyYears.includes($filterYearE.value.trim());

    return fullNameMatch && facultyMatch && yearSMatch && yearEMatch;
  }

  //// :::::::::::::::::::::::::::::::::::function RENDER:::::::::::::::::::::::::::::::::

  function render(arrData) {
    $tableBody.innerHTML = '';
    let copyStudentsArr = [...arrData]

    //prep
    for (oneStudent of copyStudentsArr) {
      oneStudent.fullName = oneStudent.name + ' ' + oneStudent.middleName + ' ' + oneStudent.surname;
      oneStudent.age = getAge(oneStudent.dateOfBirth)
      oneStudent.studyYears = getYears(parseInt(oneStudent.yearStart, 10));

      // Validate starting year of education
      if (oneStudent.yearStart < 2000 || oneStudent.yearStart > new Date().getFullYear()) {
        alert('The starting year of education must not be earlier than 2000');
        return;
      }
    };

    //sort
    copyStudentsArr = copyStudentsArr.sort(function (a, b) {
      let sort = a[sortColumnFlag] < b[sortColumnFlag]
      if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
      if (sort) return -1
    })

    //creating new Tr for each obj of the array
    for (const oneStudent of copyStudentsArr) {
      const $newTr = createStudentTr(oneStudent)
      $tableBody.append($newTr);
    }
  }

  render(studentsArr);


  //:::::::::::::::::::::::::::::::::::::::adding elements to the table::::::::::::::::::::::::::::::::::::::
  $addForm.addEventListener('submit', function (e) {
    e.preventDefault()

    if ($name.value.trim() == '') {
      alert('Name missing!')
      return
    }

    if ($surname.value.trim() == '') {
      alert('Surname missing!')
      return
    }
    if ($middleName.value.trim() == '') {
      alert('Middle name missing!')
      return
    }
    if ($studyYearStart.value.trim() == '') {
      alert('Study year start missing!')
      return
    }
    if ($faculty.value.trim() == '') {
      alert('Faculty name missing!')
      return
    }

    // Validate date of birth
    const validDateOfBirth = new Date($dateOfBirth.value.split('.').reverse().join('-'));
    if (!isValidDateOfBirth(validDateOfBirth)) {
      alert('Invalid date of birth');
      return;
    }

    // Validate starting year of education
    if ($studyYearStart.value < 2000 || $studyYearStart.value > new Date().getFullYear()) {
      alert('The starting year of education must be between 2000 and the current year');
      return;
    }

    studentsArr.push({
      surname: $surname.value,
      name: $name.value,
      middleName: $middleName.value,
      dateOfBirth: $dateOfBirth.value,
      yearStart: $studyYearStart.value,
      faculty: $faculty.value
    });

    render(studentsArr);

    // Clear the form
    $addForm.reset();
  });

  // :::::::::::::::::::::::::::::::::::sort & filter events:::::::::::::::::::::::::::::::::

  //sort events
  $sortFullName.addEventListener('click', function () {
    sortColumnFlag = 'fullName'
    sortDirFlag = !sortDirFlag
    render(studentsArr)
  })

  $sortFaculty.addEventListener('click', function () {
    sortColumnFlag = 'faculty'
    sortDirFlag = !sortDirFlag
    render(studentsArr)
  })

  $sortDateOfBirth.addEventListener('click', function () {
    sortColumnFlag = 'age'
    sortDirFlag = !sortDirFlag
    render(studentsArr)
  })

  $sortYearStudy.addEventListener('click', function () {
    sortColumnFlag = 'studyYears'
    sortDirFlag = !sortDirFlag
    render(studentsArr)
  })


  // filter events
  $filterForm.addEventListener('submit', function (event) {
    event.preventDefault()
    render(studentsArr.filter(filterStudents));
  });

  $filterFullName.addEventListener('input', function () {
    render(studentsArr.filter(filterStudents));
  });

  $filterFaculty.addEventListener('input', function () {
    render(studentsArr.filter(filterStudents));
  });

  $filterYearS.addEventListener('input', function () {
    render(studentsArr.filter(filterStudents));
  });

  $filterYearE.addEventListener('input', function () {
    render(studentsArr.filter(filterStudents));
  });

  // Clear button for Full Name filter
  const $clearFullName = document.getElementById('clearFullName');
  $clearFullName.addEventListener('click', function () {
    $filterFullName.value = '';
    render(studentsArr.filter(filterStudents));
  });

  const $clearFaculty = document.getElementById('clearFaculty');
  $clearFaculty.addEventListener('click', function () {
    $filterFaculty.value = '';
    render(studentsArr.filter(filterStudents));
  });

  const $clearYearStart = document.getElementById('clearYearStart');
  $clearYearStart.addEventListener('click', function () {
    $filterYearS.value = '';
    render(studentsArr.filter(filterStudents));
  });

  const $clearYearEnd = document.getElementById('clearYearEnd');
  $clearYearEnd.addEventListener('click', function () {
    $filterYearE.value = '';
    render(studentsArr.filter(filterStudents));
  });

});

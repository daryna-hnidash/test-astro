const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CITIES = [
  "Kyiv", "Kharkiv", "Odessa", "Dnipro", "Donetsk", "Zaporizhzhia",
  "Lviv", "Kryvyi Rih", "Mykolaiv", "Mariupol", "Luhansk", "Vinnytsia",
  "Makiivka", "Simferopol", "Kherson", "Poltava", "Chernihiv",
  "Cherkasy", "Zhytomyr", "Sumy", "Khmelnytskyi", "Chernivtsi",
  "Horlivka", "Rivne", "Ivano-Frankivsk", "Kremenchuk", "Ternopil",
  "Lutsk", "Bila Tserkva", "Kramatorsk", "Melitopol", "Kerch",
  "Uzhhorod", "Berdiansk", "Sloviansk", "Sevastopol", "Pavlohrad",
  "Kamianets-Podilskyi", "Brovary", "Berdychiv", "Shostka",
  "Drohobych", "Nizhyn", "Kolomyia", "Uman", "Boryspil", "Bucha",
  "Fastiv", "Konotop", "Irpin", "Lubny", "Stryi", "Chornobyl",
  "Boyarka", "Mukachevo", "Bila Tserkva", "Korosten", "Sambir",
  "Boryslav", "Kalush", "Sviatohirsk", "Smila", "Enerhodar",
  "Pokrovsk", "Zhovti Vody", "Sievierodonetsk", "Kostiantynivka",
  "Netishyn", "Chuhuiv", "Izmail", "Bakhmut", "Pryluky", "Trostianets",
  "Zdolbuniv", "Pereiaslav", "Dunaivtsi", "Ovruch", "Zinkiv",
  "Yuzhnoukrainsk", "Ladyzhyn", "Chortkiv", "Tsyurupynsk", "Vyshneve",
  "Podilsk", "Reni", "Vasylkiv", "Starobilsk", "Nemyriv", "Zhashkiv",
  "Kaniv", "Yalta", "Alushta", "Khotyn", "Nova Kakhovka", "Slavutych",
  "Vatutine", "Horodok", "Dzhankoi", "Shepetivka", "Pervomaisk",
  "Novohrad-Volynskyi", "Chervonohrad", "Balta", "Hadiach", "Polohy",
  "Saky", "Teofipol", "Saky", "Koziatyn", "Yampil"
];

$(function () {
  $('#circle').circleProgress({
    value: 0.0,
    size: 124,
    thickness: 4,
    fill: {
      color: "orange"
    }
  });

  function updateProgress(value) {
    $('#circle').circleProgress('value', value);
    $('.progress-value').text(Math.round(value * 100 - 25) + '%');
  }

  let value = 0;
  $currentStep = 0;

  $(".step__btn").on("click", () => {
    $(".step").eq($currentStep).removeClass("active");
    $currentStep++
    $(".step").eq($currentStep).addClass("active");

    if ($currentStep === 4) {
      alert("Finished");
      return;
    }

    if ($currentStep === 2) {
      $(".li").hide();
      $(".checkmark").hide();
      $(".message").hide();
      let liIndex = 0

      let interval = setInterval(function () {
        value += 0.25;
        updateProgress(value);
        $(".li").eq(liIndex).delay(500).fadeIn();
        $(".checkmark").eq(liIndex).delay(700).fadeIn();
        liIndex++;

        if (value > 1) {
          clearInterval(interval);
          $(".message").fadeIn();
          setTimeout(() => {

            $(".step").eq($currentStep).removeClass("active");
            $currentStep++
            $(".step").eq($currentStep).addClass("active");
          }, 2000);
        }
      }, 1000);
    }
  });

  var currentDate = new Date();
  var nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  var singleDates = [
    new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 5),
    new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 30)
  ];

  var startDates = [new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 5), new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 15)];
  var endDates = [new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 10), new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 20)];

  $("#datepicker").datepicker({
    defaultDate: nextMonth,
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShowDay: function (date) {
      for (var i = 0; i < startDates.length; i++) {
        if (date.getTime() === startDates[i].getTime()) {
          return [true, "highlight-start", "Start of Period"];
        }
        if (date.getTime() === endDates[i].getTime()) {
          return [true, "highlight-end", "End of Period"];
        }
        if (date > startDates[i] && date < endDates[i]) {
          return [true, "highlight-period", "Highlighted Period"];
        }
      }
      if (singleDates.find(function (d) { return d.getTime() === date.getTime(); })) {
        return [true, "highlight-date", "Highlighted Date"];
      }
      return [true, "", ""];
    }
  });

  for (var i = 1; i <= 31; i++) {
    $('#day').append($('<option>', {
      value: i,
      text: i
    }));
  }

  MONTHS.forEach((month) => {
    $('#month').append($('<option>', {
      value: month,
      text: month,
    }));
  })
  CITIES.forEach((city) => {
    $('#birthplace').append($('<option>', {
      value: city,
      text: city,
    }));
  })

  var currentYear = new Date().getFullYear();
  for (var i = currentYear; i >= currentYear - 70; i--) {
    $('#year').append($('<option>', {
      value: i,
      text: i
    }));
  }

  $("#btn").addClass('step__btn--disabled')
  let selectsChanged = 0;

  $('#day').one("change", function () {
    selectsChanged++
    checkButtonActivation()
    console.log(selectsChanged)
  })
  $('#month').one("change", function () {
    selectsChanged++
    checkButtonActivation()
    console.log(selectsChanged)
  })
  $('#year').one("change", function () {
    selectsChanged++
    checkButtonActivation()
    console.log(selectsChanged)
  })
  $('#birthplace').one("change", function () {
    selectsChanged++
    checkButtonActivation()
    console.log(selectsChanged)
  })

  function checkButtonActivation() {
    if (selectsChanged >= 4) {
      $(".step__btn--disabled").removeClass("step__btn--disabled")// 
    }
  }
});

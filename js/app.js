let program = {
  biayaTetap: 0,
  biayaVariabel: 0,
  harga: 0,
  unit: 0,
  bepUnit: 0,
  bepRupiah: 0,
  ctx: null,
  scatterChart: null,
  hitung: function() {
    this.biayaTetap = $("#biaya-tetap").val();
    this.biayaVariabel = $("#biaya-variabel").val();
    this.harga = $("#harga-per-unit").val();
    this.unit = $("#unit").val();
    this.bepUnit = this.biayaTetap / (this.harga - this.biayaVariabel);
    this.bepRupiah = this.bepUnit * this.harga;
  },
  tampilkan: function() {
    $("#biaya-tetap").val(this.biayaTetap);
    $("#biaya-variabel").val(this.biayaVariabel);
    $("#harga-per-unit").val(this.harga);
    $("#unit").val(this.unit);
    $("#bep-unit").val(this.bepUnit);
    $("#bep-rupiah").val(this.bepRupiah);
  },
  getXY: function() {
    let titik = [];
    $(".tahap-group").each(function(index) {
      let x = $(this)
          .find(".input-tahap")
          .val(),
        y = x * program.harga;

      titik.push({
        x: x,
        y: y
      });
    });
    // console.log(titik);
    titik.unshift({
      x: 0,
      y: 0
    });
    titik.push({
      x:program.unit,
      y: program.unit * program.harga
    });
    return titik;
  },
  updateGrafik: function() {
    // bep
    this.scatterChart.data.datasets[0].data = this.getXY();
    // bep
    this.scatterChart.data.datasets[1].data = [
      {
        x: 0,
        y: this.bepRupiah
      },
      {
        x: this.bepUnit,
        y: this.bepRupiah
      },
      {
        x: this.bepUnit,
        y: 0
      }
    ];
    // biaya tetap
    this.scatterChart.data.datasets[2].data = [
      {
        x: 0,
        y: this.biayaTetap
      },
      {
        x: this.unit,
        y: this.biayaTetap
      }
    ];
    // biaya variabel
    this.scatterChart.data.datasets[3].data = [
      {
        x: 0,
        y: this.biayaTetap
      },
      {
        x: this.unit,
        y: this.unit * this.biayaVariabel + Number(this.biayaTetap)
      }
    ];
  }
};

program.grafik = document.getElementById("chart").getContext("2d");

// let gradientStroke = program.grafik.createLinearGradient(500, 0, 100, 0);
// gradientStroke.addColorStop(0, "#80b6f4");
// gradientStroke.addColorStop(1, "#f49080");

let gradientFill1 = program.grafik.createLinearGradient(0, 0, 0, 500);
gradientFill1.addColorStop(0, "rgba(234, 67, 52, 0.5)");
gradientFill1.addColorStop(0.5, "rgba(234, 67, 52, 0.25)");
gradientFill1.addColorStop(1, "rgba(234, 67, 52, 0)");

let gradientFill = program.grafik.createLinearGradient(0, 0, 0, 600);
gradientFill.addColorStop(0, "rgba(128, 182, 244, 1)");
gradientFill.addColorStop(0.5, "rgba(128, 182, 244, 0.5)");
gradientFill.addColorStop(1, "rgba(128, 182, 244, 0)");
// gradientFill.addColorStop(1, "rgba(244, 144, 128, 1)");

// start updateGrafik
program.scatterChart = new Chart(program.grafik, {
  type: "scatter",
  scaleStartValue: 0,
  data: {
    datasets: [
      {
        label: "Bep Unit",
        borderColor: "#E3D748",
        showLine:true,
        pointBorderColor: "#E3D748",
        pointBackgroundColor: "#E3D748",
        pointHoverBackgroundColor: "#E3D748",
        pointHoverBorderColor: "#E3D748",
        fill: false,

        data: [
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 0
          }
        ]
      },
      // bep
      {
        label: "Break Even Point",
        borderColor: "#218791",
        showLine:true,
        pointBorderColor: "#218791",
        pointBackgroundColor: "#218791",
        pointHoverBackgroundColor: "#218791",
        pointHoverBorderColor: "#218791",
        pointRadius: 5,
        fill: false,
        borderDash: [10, 5],
        data: [
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 0
          }
        ]
      },
      // biaya tetap
      {
        label: "Biaya Tetap",
        showLine:true,
        backgroundColor: "rgba(128, 182, 244, 0)",
        // backgroundColor: gradientFill,
        borderColor: "rgba(128, 182, 244, 1)",
        pointBorderColor: "rgba(128, 182, 244, 1)",
        pointBackgroundColor: "rgba(128, 182, 244, 1)",
        pointHoverBackgroundColor: "rgba(128, 182, 244, 1)",
        pointHoverBorderColor: "rgba(128, 182, 244, 1)",
        fill: true,
        data: [
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 0
          }
        ]
      },

      // biaya variabel
      {
        label: "Biaya Variabel",
        showLine:true,
        backgroundColor: gradientFill1,
        backgroundColor: "rgba(240, 78, 81,0)",
        borderColor: "rgba(240, 78, 81,1)",
        pointBorderColor: "rgba(240, 78, 81,1)",
        pointBackgroundColor: "rgba(240, 78, 81,1)",
        pointHoverBackgroundColor: "rgba(240, 78, 81,1)",
        pointHoverBorderColor: "rgba(240, 78, 81,1)",
        data: [
          {
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 0
          }
        ]
      }
    ]
  },
  options: {
    showLines: true,
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          ticks: {
            beginAtZero: true
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});
// end updateGrafik

$("#btn-about").on("click", function() {
  $("#container-about").toggleClass("d-none");
});

$("#btn-tutup-about").on("click", function() {
  $("#container-about").toggleClass("d-none");
});

$("#btn-help").on("click", function() {
  $("#container-help").toggleClass("d-none");
});

$("#btn-tutup-help").on("click", function() {
  $("#container-help").toggleClass("d-none");
});

$("body").on("input", "input", function() {
  program.hitung();
  program.tampilkan();
  program.updateGrafik();
  program.scatterChart.update();
});

$("body").on("click", ".btn-hapus", function() {
  $(this)
    .closest(".tahap-group")
    .remove();
  program.updateGrafik();
  program.scatterChart.update();
});

$("#btn-add").on("click", function() {
  $("#container-tahap").append(`
        <div class="tahap-group">
            <input class="input-tahap" type="number">
            <button class="btn-hapus">X</button>
        </div>
    `);
});
$("#btn-coba").on("click", function() {
  $("#container-help").toggleClass("d-none");
  // untuk desain
  $("#biaya-tetap").val("150000000");
  $("#biaya-variabel").val("75000");
  $("#harga-per-unit").val("100000");
  $("#unit").val("8000");
  $('.input-tahap:eq(0)').val('5000');
  $('.input-tahap:eq(1)').val('6000');
  $('.input-tahap:eq(2)').val('8000');
  program.hitung();
  program.tampilkan();
  program.updateGrafik();
  program.scatterChart.update();
});

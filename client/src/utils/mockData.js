
export const emptyData = {
    ch0: {
        name: "A7",
        data: []
    },
    ch1: {
        name: "A8",
        data: []
    },
    ch2: {
        name: "T9",
        data: []
    },
    ch3: {
        name: "T10",
        data: []
    }
};

export const emptyBandData = {
  ch0: {
      name: "A7",
      data: []
  },
  ch1: {
      name: "A8",
      data: []
  },
  ch2: {
      name: "T9",
      data: []
  },
  ch3: {
      name: "T10",
      data: []
  }
};

export const chartOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time"
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Electrical Activity"
          },
          ticks: {
            display: false,
            max: 300,
            min: -300
          },
          gridLines: {
            display: false,
          }
        }
      ]
    },
    elements: {
        line: {
            borderColor: 'rgba( 128 , 128, 128)',
            fill: false
        },
        point: {
            radius: 0
        }
    },
    animation: {
        duration: 0
    },
    title: {
      display: true,
      text: ""
    },
    responsive: true,
    tooltips: { enabled: false },
    legend: { display: false }
  };

  export const timeOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "Beta"
          },
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "Time"
          },
          ticks: {
            display: false,
            max: 10,
            min: 0
          },
          gridLines: {
            display: true,
          }
        }
      ]
    },
    elements: {
        line: {
            borderColor: 'rgba( 128 , 128, 128)',
            fill: false
        },
        point: {
            radius: 0
        }
    },
    animation: {
        duration: 0
    },
    title: {
      display: true,
      text: ""
    },
    responsive: true,
    tooltips: { enabled: false },
    legend: { display: false }
  };


export const barOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "Time"
          },
          gridLines: {
            display: false,
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: false,
            labelString: "Electrical Activity"
          },
          ticks: {
            display: false,
            max: 10,
            min: 0,
          },
          gridLines: {
            display: false,
          }
        }
      ]
    },
    animation: {
        duration: 0
    },
    title: {
      display: true,
      text: ""
    },
    responsive: true,
    tooltips: { enabled: false },
    legend: { display: false }
};


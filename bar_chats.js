const visObject = {
    create: function(element, config){
        element.innerHTML = "";
    },

    updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
        
    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }
        
        
        const data_labels = queryResponse.fields.dimension_like.map(item => item.name)
        const actual_data = queryResponse.fields.measure_like.map(item => item.value)
        
       /* data.forEach((d)=>{
            data_labels.push(d["category"])
            actual_data.push(d["value"])
        })*/

        const vizCanvas = document.createElement('canvas')
        vizCanvas.setAttribute("id", "myChart")

        const vizDiv = document.getElementById("vis")
        vizDiv.appendChild(vizCanvas)

        const ctx = document.getElementById("myChart")
      
      const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data_labels,
                datasets: [{
                    //label: data_labels,
                    
                    data: actual_data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(153, 102, 180, 0.2)',
                        'rgba(153, 102, 185, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(153, 102, 180, 1)',
                        'rgba(153, 102, 185, 1)'
                    ],
                    borderWidth: 1
                }]
            },
        
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },

              maintainAspectRatio: false

            },
options: {
      maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        fontFamily: "Arial",
        labels: {
          usePointStyle: true,
          fontColor: "red",
          generateLabels(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              const {labels: {pointStyle}} = chart.legend.options;
  
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                
                return {
                  text: label + ' - ' + chart.data.datasets[0].data[i],
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  pointStyle: pointStyle,
                  hidden: !chart.getDataVisibility(i),
  
                  index: i
                };
              });
            }
            return [];
          }
        }
    }
      }
    }
        
        });

        doneRendering()
    }
};

looker.plugins.visualizations.add(visObject);

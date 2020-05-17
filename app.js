
const PDFStarter = pdfName => {
    let contCanvas = document.querySelector('#cont-canvas'),
        canvasElement = document.createElement('canvas'),
        canvas = canvasElement,
        ManyCanvas = contCanvas.getElementsByTagName('canvas'),
        loadingTask  = pdfjsLib.getDocument(`${pdfName}`),
        pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,        
        scale = 2,
        ctx = canvas.getContext('2d');
        contCanvas.appendChild(canvasElement)
        if(ManyCanvas.length > 1){
            ManyCanvas[0].remove()
        }
        const renderPage = (num) => {
            pageRendering = null;
            pdfDoc.getPage(num).then(page => {
                let viewport = page.getViewport({ scale: scale});
                    canvas.height =  viewport.height;
                    canvas.width =  viewport.width;

                let renderContext = {
                    canvasContext : ctx,
                    viewport : viewport
                };

                let renderTask = page.render(renderContext);

                    renderTask.promise.then(() => {
                        pageRendering = false                        
                        if(pageNumPending !== null){
                            renderPage(pageNumPending);
                            pageNumPending = null;
                        }
                    })

            });
            document.querySelector('#page-number').textContent = num;
        }
        const onPrevPage = () => {
            if (pageNum <= 1) {
                return;
              }
              pageNum--;
              renderPage(pageNum);
        }
      
        const onNextPage = () => {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            renderPage(pageNum);
          }
          document.getElementById('prev').addEventListener('click', onPrevPage);
          document.getElementById('next').addEventListener('click', onNextPage);

          loadingTask.promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            document.querySelector('#page-number').textContent = pdfDoc.numPages;
            renderPage(pageNum);
          })

}

window.addEventListener('load',() => {
    let btnP = document.querySelector('#para'),
        btnN = document.querySelector('#nose');
        btnP.addEventListener('click', () => PDFStarter('./m.pdf'))
        btnN.addEventListener('click', () => PDFStarter('./r.pdf'))
})
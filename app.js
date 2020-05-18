
const PDFStarter = pdfName => {
    let contCanvas    = document.querySelector('#cont-canvas'),
        canvasElement = document.createElement('canvas'),
        canvas        = canvasElement,
        ManyCanvas    = contCanvas.getElementsByTagName('canvas'),
        loadingTask   = pdfjsLib.getDocument(`${pdfName}`),
        pdfDoc        = null,
        pageNum       = 1,
        scale         = 3,
        ctx           = canvas.getContext('2d'),
        a             = document.querySelector('.download-pdf'),
        nameSplit     = pdfName.split('/');

        a.setAttribute('href', `${window.origin}/${nameSplit[1]}`)
        contCanvas.appendChild(canvasElement);

        if(ManyCanvas.length > 1){
            ManyCanvas[0].remove()
        }
        const renderPage = (num) => {
            pdfDoc.getPage(num).then(page => {
                let viewport = page.getViewport({ scale: scale});
                    canvas.height =  viewport.height;
                    canvas.width =  viewport.width;

                let renderContext = {
                    canvasContext : ctx,
                    viewport : viewport
                };
                page.render(renderContext);
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
const appearModal = () => {
    let modal = document.querySelector('.cont-drive-clone');
        modal.classList.toggle('active')
}
window.addEventListener('load',() => {
    let btnP    = document.querySelector('#para'),
        btnN    = document.querySelector('#nose'),
        btnExit = document.querySelector('#exit'),
        ContC   = document.querySelector('#cont-canvas');

        btnP.addEventListener('click', () => {PDFStarter('./m.pdf'); appearModal()});
        btnN.addEventListener('click', () => {PDFStarter('./r.pdf'); appearModal()});        
        btnExit.addEventListener('click', appearModal);
})
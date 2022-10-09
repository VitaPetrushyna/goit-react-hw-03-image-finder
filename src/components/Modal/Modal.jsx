import * as basicLightbox from 'basiclightbox';

const Modal = basicLightbox.create(`
    <div class="modal">
        <p>
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
    </div>
`);

Modal.show();

export default Modal;

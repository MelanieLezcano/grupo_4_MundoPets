window.addEventListener('load', () => {

    
    let forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', event => {
                event.preventDefault();
                Swal.fire({
                customClass: {
                    confirmButton: 'swalBtnColor',
                    cancelButton: 'swalBtnColor'
                },

                title: '¿Estas seguro que quieres eliminar el producto?',
                text: "¡Este producto desaparecera!",
                icon: 'warning',
                background: "#ebebeb",
                showCancelButton: true,
                confirmButtonColor: 'var(--colorAzulMarino)',
                cancelButtonColor: 'var(--colorNaranja)',
                confirmButtonText: 'Eliminar',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },

                }).then((result) => {

                    if (result.isConfirmed) {
                        forms[i].submit();
                    }

                })
        })
    }
})
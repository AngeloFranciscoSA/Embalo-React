import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField} from '@mui/material';
import {Container, Button, Modal, Box, Typography} from "@mui/material";
import {Remove as RemoveIcon, Edit as EditIcon} from '@mui/icons-material';
import Swal from 'sweetalert2';
import {busca, buscaPorId, atualizar, remover} from "../../api/api";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '10px solid rgba(255,255,255,.5)',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    '& button': { m: 1}
    };

function DisplayCarros(){
    const [carros, setCarros] = useState<any>({'data': []})

    const [modelo, setModelo] = useState("")
    const [marca, setMarca] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")
    const [carroEdit, setCarroEdit] = useState({'id': '', 'modelo': '', 'marca': '', 'valor': '', 'ano': ''})

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleModal = (id: any) => {
        buscaPorId('carros', id, setCarroEdit).then( r => {
            if(r.status === 200){
                handleOpen()
            }
        })
    }

    const handleSwal = (id: any) =>{
        Swal.fire({
            title: 'Deseja remover carro?',
            text: 'Ao remover este carro, ele irá sair do sistema e precisará inseri-lo manualmente novamente!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Não',
            cancelButtonColor: '#C0392B',
            confirmButtonText: 'Sim',
            confirmButtonColor: '#27AE60'
        }).then(res => {
            if(res.isConfirmed === true){
                remover('carros', id).then(r => {
                    if(r.status === 200){
                        Swal.fire({
                            title: 'Removido com sucesso!',
                            text: 'Carro removido com sucesso!',
                            icon: 'success',
                            confirmButtonText: 'Fechar',
                        }).then( res => {
                            if(res.isConfirmed === true){
                                window.location.reload();
                            }
                        })
                    }else{
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Aconteceu algum erro durante o processo de remoção!',
                            icon: 'error',
                            confirmButtonText: 'Fechar',
                        })
                    }
                })
            }
        })
    }

    useEffect(()=>{
        busca('carros', setCarros)
    }, ['carros']);

    return(
        <Container>
            <h1>Mostrando os Carros</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Modelo</TableCell>
                            <TableCell align="right">Ano</TableCell>
                            <TableCell align="right">Valor&nbsp;(R$)</TableCell>
                            <TableCell align="right">Editar</TableCell>
                            <TableCell align="right">Remover</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carros.data.map( (row: any, index: any) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right"> { row.marca } </TableCell>
                                <TableCell align="right"> { row.modelo } </TableCell>
                                <TableCell align="right"> { row.ano } </TableCell>
                                <TableCell align="right"> { row.valor } </TableCell>
                                <TableCell align="right"> <Button onClick={() => handleModal(row.id)} variant="contained"><EditIcon/></Button> </TableCell>
                                <TableCell align="right"> <Button onClick={() => handleSwal(row.id)} variant="contained" color="error"><RemoveIcon/></Button> </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Editar carros
                    </Typography>

                    <form
                        onSubmit={(event => {
                            event.preventDefault()
                            atualizar('/carros', {
                                'id': carroEdit.id,
                                'modelo': modelo === '' ? carroEdit.modelo : modelo,
                                'marca': marca === '' ? carroEdit.marca : marca,
                                'ano': ano === '' ? carroEdit.ano : ano,
                                'valor': valor === '' ? carroEdit.valor : valor
                            }).then(r => {
                                if(r.status === 201){
                                    handleClose()
                                    Swal.fire({
                                        title: 'Inserido com sucesso!',
                                        text: 'O carro foi inserido com sucesso!',
                                        icon: 'success',
                                        confirmButtonText: 'Fechar',
                                    }).then( res => {
                                        if(res.isConfirmed === true){
                                            window.location.reload();
                                        }
                                    })
                                }else{
                                    Swal.fire({
                                        title: 'Erro!',
                                        text: 'Aconteceu algum erro durante o processo de adição de um novo carro!',
                                        icon: 'error',
                                        confirmButtonText: 'Fechar',
                                    })
                                }

                            })
                        })}
                    >


                        <TextField
                            defaultValue = {carroEdit.modelo}
                            onChange={(event => {
                                setModelo(event.target.value)
                            })}
                            id="modelo"
                            label="Modelo"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            defaultValue = {carroEdit.marca}
                            onChange={(event => {
                                setMarca(event.target.value)
                            })}
                            id="marca"
                            label="Marca"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            defaultValue = {carroEdit.ano}
                            onChange={(event => {
                                setAno(event.target.value)
                            })}
                            id="ano"
                            label="Ano"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            defaultValue = {carroEdit.valor}
                            onChange={(event => {
                                setValor(event.target.value)
                            })}
                            id="valor"
                            label="Valor"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                        />

                        <Button type="submit" variant="contained" color="success">Atualizar</Button>
                        <Button type="submit" variant="contained" color="error" onClick={handleClose}>Fechar</Button>
                    </form>
                </Box>
            </Modal>
        </Container>
    )
}

export default DisplayCarros
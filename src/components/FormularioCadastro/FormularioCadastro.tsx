import React, {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import Swal from 'sweetalert2';
import { inserir } from "../../api/api";

function FormularioCadastro(){

    const [modelo, setModelo] = useState("")
    const [marca, setMarca] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")

    return (
        <Container component="article" maxWidth="sm">
            <Typography variant="h3" component="h1" align="center">
                Formulario de Cadastro
            </Typography>


            <form
                onSubmit={(event => {
                    event.preventDefault()
                    inserir('/carros', {
                        'modelo': modelo,
                        'marca': marca,
                         'ano': ano,
                        'valor': valor
                    }).then(r => {
                        if(r.status === 201){
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
                    value = {modelo}
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
                    value = {marca}
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
                    value = {ano}
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
                    value = {valor}
                    onChange={(event => {
                        setValor(event.target.value)
                    })}
                    id="valor"
                    label="Valor"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />

                <Button type="submit" variant="contained" color="primary">Cadastrar</Button>
            </form>
        </Container>
    );
}

export default FormularioCadastro
const mongoose = require( 'mongoose' );
const express = require('express')

const url = 'mongodb+srv://shreyas:Shre024689@cluster0.s771kxo.mongodb.net/myMovieAppDB?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url)
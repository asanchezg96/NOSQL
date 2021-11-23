/*db.personas.aggregate([
    {$match: {gender:"female"}},//Escoge los documento o filtro
    {$group: {_id: {ciudad:"$location.city"}, personas:{$sum:1} }}, //escoge el capo por agrupar
    {$sort: {personas:-1} } //ordenar
]).pretty();*/

db.personas.aggregate([
    {$project: 
        {_id:0, 
            gender:1, 
            NombreCompleto: {
                $concat:[
                    {$toUpper:"$name.first"},
                     " ",
                    {$toUpper:"$name.last"}
                    ]
                    
            }
        }
    }

]).pretty();

db.personas.aggregate([
    {$project: 
        {_id:0, 
            gender:1, 
            NombreCompleto: {
                $concat:[
                    {$toUpper: {$substrCP:["$name.first",0,1]}},
                    {$substrCP:[
                        "$name.first",
                        1,
                        {$subtract:[{$strLenCP:"$name.first"},1]}]},
                    " ",
                    {$toUpper: {$substrCP:["$name.last",0,1]}},
                    {$substrCP:[
                        "$name.last",
                        1,
                        {$subtract:[{$strLenCP:"$name.last"},1]}]}
                    ]   
            }
        }
    }

]).pretty()


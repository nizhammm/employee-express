const express = require("express")
const app = express()

const PORT = 2000

app.use(express.json())

const { nanoid } = require("nanoid")

const employee = [
    {
        full_name: "Luna Stroman",
        gender: "Female",
        occupation: "Metrics",
        id: 1
      },
      {
        full_name: "Gussie Orn",
        gender: "Female",
        occupation: "Marketing",
        id: 2
      },
      {
        full_name: "Evans Crooks",
        gender: "Male",
        occupation: "Markets",
        id: 3
      },
      {
        full_name: "Breanna Mayer",
        gender: "Male",
        occupation: "Infrastructure",
        id: 4
      },
      {
        full_name: "Alexys Metz",
        gender: "Male",
        occupation: "Security",
        id: 5
      },
]

app.get("/employee", (req, res) => {
    if (employee.length) {
        res.status(200).json({
            message: "Employee fetched success!",
            result: employee
        })
    } else {
      res.status(404).send("No employee found!")
    }
})

app.get("/employee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId

  const findIndex = employee.findIndex((val) => {
    return val.id == employeeId
  })

  if (findIndex == -1) {
    res.status(400).send(`employee with Id ${employeeId}, not found`)
  }

  res.status(200).json({
    message: "employee found",
    result: employee[findIndex]
  })
})

app.post("/employee", (req, res) => {
  const data = req.body

  if (!(data.full_name || data.gender || data.occupation)) {
    res.status(400).send("All data must filled!")

    return
  }

  const newEmployeeData = {...data, id: nanoid() }

  employee.push(newEmployeeData)

  res.status(201).json({
    message: "Added employee",
    result: newEmployeeData
  })
})

app.delete("/employee/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId

  const findIndex = employee.findIndex((val) => {
    return val.id == employeeId
  })

  if (findIndex == -1) {
    res.status(400).json({
      message: `employee with Id ${employeeId}, not found`
    })
    return
  }

  employee.splice(findIndex, 1)

  res.status(200).json({
    message: "Employee deleted!"
  })
})

app.patch("/employee/:employeeId", (req, res) => {
  const editData = req.body
  const employeeId = req.params.employeeId

  const findIndex = employee.findIndex((val) => {
    return val.id == employeeId
  })

  if (findIndex == -1) {
    res.status(400).send("Employee not found!")
  }
  
  employee[findIndex] = {
    ...employee[findIndex],
    ...editData
  }

  res.status(201).json({
    message: `Employee with Id ${employeeId} has been edited`,
    result: employee[findIndex]
  })
})


app.listen(PORT, () => {
    console.log("Server running in port", PORT)
})
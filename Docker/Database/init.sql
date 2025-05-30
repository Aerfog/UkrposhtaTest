CREATE TABLE IF NOT EXISTS Companies (
    Id SERIAL PRIMARY KEY CHECK (id = 1),
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Phone VARCHAR(50) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Description TEXT
);

CREATE TABLE IF NOT EXISTS Departments (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Positions (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Employees (
    Id SERIAL PRIMARY KEY,
    LastName VARCHAR(255) NOT NULL,
    FirstName VARCHAR(255) NOT NULL,
    MiddleName VARCHAR(255),
    Address VARCHAR(255),
    Phone VARCHAR(50),
    BirthDate DATE NOT NULL,
    HireDate DATE NOT NULL,
    Salary NUMERIC(18,2) NOT NULL,
    DepartmentId INT NULL,
    PositionId INT NULL,
    CompanyId INT NULL,
    CONSTRAINT fk_department FOREIGN KEY (DepartmentId) REFERENCES Departments(Id) ON DELETE SET NULL,
    CONSTRAINT fk_position FOREIGN KEY (PositionId) REFERENCES Positions(Id) ON DELETE SET NULL
);

INSERT INTO Companies (Id, Name, Address, Phone, Email, Description)
VALUES (1, 'TechSolutions Inc.', '123 Business Ave, Tech City, TC 12345', '+1 (555) 123-4567', 'info@techsolutions.com',
        'Leading technology solutions provider specializing in enterprise software development and IT consulting services since 2010.');


INSERT INTO Departments (Name) VALUES
                                   ('Engineering'),
                                   ('Marketing'),
                                   ('Human Resources'),
                                   ('Finance'),
                                   ('Operations'),
                                   ('Sales'),
                                   ('Customer Support');


INSERT INTO Positions (Name) VALUES
                                 ('Software Developer'),
                                 ('Senior Software Developer'),
                                 ('Marketing Manager'),
                                 ('HR Specialist'),
                                 ('Financial Analyst'),
                                 ('Operations Manager'),
                                 ('Sales Representative'),
                                 ('Support Technician'),
                                 ('QA Engineer'),
                                 ('DevOps Engineer');


INSERT INTO Employees (LastName, FirstName, MiddleName, Address, Phone, BirthDate, HireDate, Salary, DepartmentId, PositionId, CompanyId)
VALUES

('Smith', 'John', 'A.', '456 Tech Street, Tech City, TC 12345', '+1 (555) 234-5678', '1985-06-15', '2015-03-10', 85000.00, 1, 1, 1),
('Johnson', 'Emily', 'B.', '789 Code Lane, Tech City, TC 12345', '+1 (555) 345-6789', '1990-11-22', '2018-07-15', 95000.00, 1, 2, 1),
('Williams', 'Michael', 'C.', '321 Algorithm Ave, Tech City, TC 12345', '+1 (555) 456-7890', '1988-03-30', '2017-05-20', 110000.00, 1, 2, 1),
('Brown', 'Sarah', 'D.', '654 Debug Road, Tech City, TC 12345', '+1 (555) 567-8901', '1992-09-12', '2019-02-05', 78000.00, 1, 1, 1),
('Davis', 'Robert', 'E.', '987 Binary Blvd, Tech City, TC 12345', '+1 (555) 678-9012', '1995-12-05', '2020-08-10', 82000.00, 1, 1, 1),


('Miller', 'Jennifer', 'F.', '147 Brand Street, Tech City, TC 12345', '+1 (555) 789-0123', '1987-04-18', '2016-11-15', 75000.00, 2, 3, 1),
('Wilson', 'David', 'G.', '258 Campaign Lane, Tech City, TC 12345', '+1 (555) 890-1234', '1991-07-25', '2018-09-22', 68000.00, 2, 3, 1),


('Moore', 'Jessica', 'H.', '369 Talent Ave, Tech City, TC 12345', '+1 (555) 901-2345', '1989-01-30', '2017-04-12', 72000.00, 3, 4, 1),
('Taylor', 'Christopher', 'I.', '741 HR Road, Tech City, TC 12345', '+1 (555) 012-3456', '1993-10-15', '2019-06-18', 65000.00, 3, 4, 1),

('Anderson', 'Amanda', 'J.', '852 Finance Blvd, Tech City, TC 12345', '+1 (555) 123-4567', '1986-05-20', '2015-08-05', 88000.00, 4, 5, 1),
('Thomas', 'Daniel', 'K.', '963 Budget Street, Tech City, TC 12345', '+1 (555) 234-5678', '1994-02-28', '2020-03-15', 76000.00, 4, 5, 1),

('Jackson', 'Matthew', 'L.', '159 Deal Lane, Tech City, TC 12345', '+1 (555) 345-6789', '1990-08-10', '2018-01-20', 90000.00, 6, 7, 1),
('White', 'Elizabeth', 'M.', '357 Revenue Ave, Tech City, TC 12345', '+1 (555) 456-7890', '1988-11-15', '2017-07-10', 82000.00, 6, 7, 1),

('Harris', 'Andrew', 'N.', '486 Support Road, Tech City, TC 12345', '+1 (555) 567-8901', '1992-03-25', '2019-04-05', 60000.00, 7, 8, 1),
('Martin', 'Nicole', 'O.', '792 Help Blvd, Tech City, TC 12345', '+1 (555) 678-9012', '1995-06-30', '2020-09-15', 58000.00, 7, 8, 1),

('Garcia', 'Kevin', 'P.', '951 Test Street, Tech City, TC 12345', '+1 (555) 789-0123', '1987-09-12', '2016-12-10', 80000.00, 1, 9, 1),
('Martinez', 'Stephanie', 'Q.', '753 Cloud Lane, Tech City, TC 12345', '+1 (555) 890-1234', '1991-12-05', '2018-10-22', 95000.00, 1, 10, 1);
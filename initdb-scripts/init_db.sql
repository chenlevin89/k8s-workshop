use main;

CREATE TABLE main.Tasks(ID int NOT NULL AUTO_INCREMENT, Title varchar(255) NOT NULL, Status TINYINT(1), PRIMARY KEY (ID));

INSERT INTO main.Tasks(Title, Status) VALUES ('K8s Fundamentals', 0), ('Helm', 0), ('Argo', 0), ('Gitops', 0);
import { useSelector } from "react-redux";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { RootState } from "../../store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";

const Accounts = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  return (
    <Box>
      <Container sx={{ display: "flex", gap: "25px", marginTop: "20px" }}>
        {accounts.map((account) => {
          return (
            <Card
              sx={{ minWidth: 275 }}
              component={Link}
              to={`/home/single-account/${account.id}`}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <AccountBalanceIcon sx={{ fontSize: 200 }} />
                </Box>

                <Typography
                  sx={{ fontSize: 25, textAlign: "center" }}
                  color="white"
                >
                  {account.accountName}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
};

export default Accounts;

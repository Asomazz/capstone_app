import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const TermsConditions = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, margin: 5 }}>
          Fluied
        </Text>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 15, margin: 5 }}>
            TERMS & CONDITIONS
          </Text>
        </View>
        <View style={{ alignContent: "center" }}>
          <Text>
            Date of Last Revision: May 16, 2024 Welcome to Fluid! Find
            Community, provides its services described below to you through its
            website located at Fluid.me/ the “Site” and related services
            collectively, such services, including any new features and
            applications, and the Site, the “Services”, subject to the following
            Terms of Service as amended from time to time, the “Terms of
            Service”. We reserve the right, at our sole discretion, to change or
            modify portions of these Terms of Service at any time. If we do
            this, we will post the changes on this page and will indicate at the
            top of this page the date these terms were last revised. We will
            also notify you, either through the Services user interface, in an
            Appnotification or through other reasonable means. Any such changes
            will become effective no earlier than fourteen 14 days after they
            are posted, except that changes addressing new functions of the
            Services or changes made for legal reasons will be effective
            immediately. Your continued use of the Service after the date any
            such changes become effective constitutes your acceptance of the new
            Terms of Service. PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS
            THEY CONTAIN AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT
            INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS.
            THIS AGREEMENT TO ARBITRATE REQUIRES WITH LIMITED EXCEPTION THAT YOU
            SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL ARBITRATION,
            AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST
            STAN ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN
            ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING, (2) YOU WILL ONLY
            BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND
            DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE
            ABLE TO HAVE ANY CLAIM S YOU HAVE AGAINST US RESOLVED BY A JURY OR
            IN A COURT OF LAW. In addition, when using certain services, you
            will be subject to any additional terms applicable to such services
            that may be posted on the Service from time to time, including,
            without limitation, the Privacy Policy. All such terms are hereby
            incorporated by reference into these Terms of Service.Access and Use
            of the Service Services Description: The Service is a platform for
            content creators (“Creators”) to monetize their digital goods,
            content, and services (“Creator Content”) and allows Creators’ fans
            and followers (“Customers”) to purchase such Creator Content using
            the Stan platform. Platform Functionality: Except for transactions
            involving the purchase of a license to use the Services, Stan is not
            a party to any transactions regarding the purchase and sale of
            Creator Content conducted through the Services – such transactions
            are solely between Creators and Customers. Neither is Stan the
            creator or owner of the Creator Content listed on or made available
            through the Services.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({});

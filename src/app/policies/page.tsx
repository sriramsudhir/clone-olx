"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Users, Calendar } from "lucide-react";
import { policies } from "@/lib/data";
import ReactMarkdown from 'react-markdown';

export default function PoliciesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold font-headline">Policies & Guidelines</h1>
        <p className="text-muted-foreground">
          Learn about our terms, privacy policy, and community guidelines.
        </p>
      </div>

      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy Policy
          </TabsTrigger>
          <TabsTrigger value="terms" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Terms of Service
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community Guidelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {policies.privacyPolicy.title}
                </CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated: {new Date(policies.privacyPolicy.lastUpdated).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ReactMarkdown>{policies.privacyPolicy.content}</ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {policies.termsOfService.title}
                </CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated: {new Date(policies.termsOfService.lastUpdated).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ReactMarkdown>{policies.termsOfService.content}</ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {policies.communityGuidelines.title}
                </CardTitle>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated: {new Date(policies.communityGuidelines.lastUpdated).toLocaleDateString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ReactMarkdown>{policies.communityGuidelines.content}</ReactMarkdown>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
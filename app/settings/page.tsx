import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Basic information about your fraud detection system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Acme Corporation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="FraudGuard" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="admin@acmecorp.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc-8">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-12">UTC-12:00</SelectItem>
                    <SelectItem value="utc-11">UTC-11:00</SelectItem>
                    <SelectItem value="utc-10">UTC-10:00</SelectItem>
                    <SelectItem value="utc-9">UTC-09:00</SelectItem>
                    <SelectItem value="utc-8">UTC-08:00 (Pacific Time)</SelectItem>
                    <SelectItem value="utc-7">UTC-07:00 (Mountain Time)</SelectItem>
                    <SelectItem value="utc-6">UTC-06:00 (Central Time)</SelectItem>
                    <SelectItem value="utc-5">UTC-05:00 (Eastern Time)</SelectItem>
                    <SelectItem value="utc-4">UTC-04:00</SelectItem>
                    <SelectItem value="utc-3">UTC-03:00</SelectItem>
                    <SelectItem value="utc-2">UTC-02:00</SelectItem>
                    <SelectItem value="utc-1">UTC-01:00</SelectItem>
                    <SelectItem value="utc">UTC+00:00</SelectItem>
                    <SelectItem value="utc+1">UTC+01:00</SelectItem>
                    <SelectItem value="utc+2">UTC+02:00</SelectItem>
                    <SelectItem value="utc+3">UTC+03:00</SelectItem>
                    <SelectItem value="utc+4">UTC+04:00</SelectItem>
                    <SelectItem value="utc+5">UTC+05:00</SelectItem>
                    <SelectItem value="utc+5:30">UTC+05:30 (India)</SelectItem>
                    <SelectItem value="utc+6">UTC+06:00</SelectItem>
                    <SelectItem value="utc+7">UTC+07:00</SelectItem>
                    <SelectItem value="utc+8">UTC+08:00 (China)</SelectItem>
                    <SelectItem value="utc+9">UTC+09:00 (Japan)</SelectItem>
                    <SelectItem value="utc+10">UTC+10:00</SelectItem>
                    <SelectItem value="utc+11">UTC+11:00</SelectItem>
                    <SelectItem value="utc+12">UTC+12:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>Configure how long data is stored in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transaction-retention">Transaction Data Retention</Label>
                <Select defaultValue="365">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="1825">5 years</SelectItem>
                    <SelectItem value="3650">10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-retention">Alert Data Retention</Label>
                <Select defaultValue="730">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="1825">5 years</SelectItem>
                    <SelectItem value="3650">10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-retention">System Log Retention</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-archive" />
                <Label htmlFor="auto-archive">Automatically archive old data</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-high-risk">High Risk Transactions</Label>
                    <Switch id="email-high-risk" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-fraud-alerts">Fraud Alerts</Label>
                    <Switch id="email-fraud-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-system-alerts">System Alerts</Label>
                    <Switch id="email-system-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reports">Weekly Reports</Label>
                    <Switch id="email-reports" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">SMS Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-high-risk">High Risk Transactions</Label>
                    <Switch id="sms-high-risk" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-fraud-alerts">Fraud Alerts</Label>
                    <Switch id="sms-fraud-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-system-alerts">System Alerts</Label>
                    <Switch id="sms-system-alerts" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Notification Recipients</h3>
                <div className="space-y-2">
                  <Label htmlFor="notification-emails">Email Recipients (comma separated)</Label>
                  <Input id="notification-emails" defaultValue="admin@acmecorp.com, security@acmecorp.com" />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="notification-phones">SMS Recipients (comma separated)</Label>
                  <Input id="notification-phones" defaultValue="+1234567890, +0987654321" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure API settings and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    defaultValue="sk_live_51NzUBtKLj6IgSt7w8hOWJFGgVQA6Jn3jQMJF7dKz"
                    type="password"
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">This key provides access to your API. Keep it secure.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" defaultValue="https://acmecorp.com/api/fraud-webhook" />
                <p className="text-sm text-muted-foreground">URL to receive webhook notifications for fraud events</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-secret"
                    defaultValue="whsec_8hOWJFGgVQA6Jn3jQMJF7dKz51NzUBtKLj6IgSt7w"
                    type="password"
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-enabled">API Access Enabled</Label>
                  <Switch id="api-enabled" defaultChecked />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">External Integrations</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Payment Processor</div>
                        <div className="text-sm text-muted-foreground">Connect to your payment processor API</div>
                      </div>
                      <Switch id="payment-integration" defaultChecked />
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="payment-api-url">API URL</Label>
                      <Input id="payment-api-url" defaultValue="https://api.processor.com/v1" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Label htmlFor="payment-api-key">API Key</Label>
                      <Input id="payment-api-key" type="password" defaultValue="sk_live_payment_processor_key" />
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Identity Verification</div>
                        <div className="text-sm text-muted-foreground">Connect to identity verification service</div>
                      </div>
                      <Switch id="identity-integration" defaultChecked />
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="identity-api-url">API URL</Label>
                      <Input id="identity-api-url" defaultValue="https://api.idverify.com/v2" />
                    </div>
                    <div className="mt-2 space-y-2">
                      <Label htmlFor="identity-api-key">API Key</Label>
                      <Input id="identity-api-key" type="password" defaultValue="sk_live_identity_verification_key" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for your fraud detection system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                    <Switch id="two-factor" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" className="w-20 text-right" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="max-attempts">Maximum Login Attempts</Label>
                    <Input id="max-attempts" type="number" defaultValue="5" className="w-20 text-right" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Input id="password-expiry" type="number" defaultValue="90" className="w-20 text-right" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="min-length">Minimum Password Length</Label>
                    <Input id="min-length" type="number" defaultValue="8" className="w-20 text-right" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                    <Switch id="require-uppercase" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-numbers">Require Numbers</Label>
                    <Switch id="require-numbers" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require-symbols">Require Special Characters</Label>
                    <Switch id="require-symbols" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prevent-reuse">Prevent Password Reuse</Label>
                    <Switch id="prevent-reuse" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">IP Restrictions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ip-whitelist">Enable IP Whitelisting</Label>
                    <Switch id="ip-whitelist" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowed-ips">Allowed IP Addresses (one per line)</Label>
                    <Textarea
                      id="allowed-ips"
                      placeholder="192.168.1.1
10.0.0.1
203.0.113.0/24"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your fraud detection system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-20 bg-white border rounded-md mb-4"></div>
                    <div className="font-medium">Light</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-20 bg-gray-900 border rounded-md mb-4"></div>
                    <div className="font-medium">Dark</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-20 bg-gradient-to-r from-white to-gray-900 border rounded-md mb-4"></div>
                    <div className="font-medium">System</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Branding</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo-upload">Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-muted">Logo</div>
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md bg-primary"></div>
                      <Input id="primary-color" defaultValue="#3b82f6" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-md bg-accent"></div>
                      <Input id="accent-color" defaultValue="#f0f0f0" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Dashboard Layout</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-view">Compact View</Label>
                    <Switch id="compact-view" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-welcome">Show Welcome Message</Label>
                    <Switch id="show-welcome" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-metrics">Show Metrics on Dashboard</Label>
                    <Switch id="show-metrics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-recent">Show Recent Transactions</Label>
                    <Switch id="show-recent" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


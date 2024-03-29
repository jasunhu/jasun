#!/bin/sh
#

#############################################################
# AnripDdns v6.0.0
#
# Dynamic DNS using DNSPod API
#
# Author: anrip, https://www.anrip.com/?s=dnspod
# Collaborators: ProfFan, https://github.com/ProfFan
#
# Usage: please refer to `ddnspod.sh`
#
#############################################################
# linux执行命令：
# 安装wget并下载ddns
# yum install -y wget && wget  -N --no-check-certificate https://gitee.com/jasunhu/jasun/raw/master/sh/DDNS.sh
# 编辑信息（i编辑，esc完成编辑，：wq退出）
# vi DDNS.sh
# 运行
# chmod +x DDNS.sh
# ./DDNS.sh
# 打开定时任务
# crontab -e
# 设置定时刷新为5分钟一次：
# */5 * * * * /root/DDNS.sh >/dev/null 2>&1
# 设置保存并退出
# :wq

export arToken=""

# Get WAN-IP

arWanIp() {

    local hostIp

    local lanIps="^$"

    lanIps="$lanIps|(^10\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$)"
    lanIps="$lanIps|(^127\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$)"
    lanIps="$lanIps|(^169\.254\.[0-9]{1,3}\.[0-9]{1,3}$)"
    lanIps="$lanIps|(^172\.(1[6-9]|2[0-9]|3[0-1])\.[0-9]{1,3}\.[0-9]{1,3}$)"
    lanIps="$lanIps|(^192\.168\.[0-9]{1,3}\.[0-9]{1,3}$)"

    case $(uname) in
        'Linux')
            hostIp=$(ip -o -4 addr list | grep -Ev '\s(docker|lo)' | awk '{print $4}' | cut -d/ -f1 | grep -Ev "$lanIps")
        ;;
        'Darwin')
            hostIp=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | grep -Ev "$lanIps")
        ;;
    esac

    if [ -z "$hostIp" ]; then
        if type wget >/dev/null 2>&1; then
            hostIp=$(wget --quiet --output-document=- http://members.3322.org/dyndns/getip)
        else
            hostIp=$(curl -s http://members.3322.org/dyndns/getip)
        fi
    fi

    echo $hostIp

}

# Dnspod Bridge
# Arg: type data

arDdnsApi() {

    local agent="AnripDdns/6.0.0(mail@anrip.com)"

    local apiurl="https://dnsapi.cn/${1:?'Info.Version'}"
    local params="login_token=$arToken&format=json&$2"

    if type wget >/dev/null 2>&1; then
        wget --quiet --no-check-certificate --output-document=- --user-agent=$agent --post-data $params $apiurl
    else
        curl -s -A $agent -d $params $apiurl
    fi

}

# Fetch Domain Ip
# Arg: domain

arDdnsInfo() {

    local domainId
    local recordId
    local recordIp

    # Get domain ID
    domainId=$(arDdnsApi "Domain.Info" "domain=$1")
    domainId=$(echo $domainId | sed 's/.*"id":"\([0-9]*\)".*/\1/')

    # Get Record ID
    recordId=$(arDdnsApi "Record.List" "domain_id=$domainId&sub_domain=$2&record_type=A")
    recordId=$(echo $recordId | sed 's/.*"id":"\([0-9]*\)".*/\1/')

    # Last IP
    recordIp=$(arDdnsApi "Record.Info" "domain_id=$domainId&record_id=$recordId")
    recordIp=$(echo $recordIp | sed 's/.*,"value":"\([0-9\.]*\)".*/\1/')

    # Output IP
    case "$recordIp" in
        [1-9]*)
            echo $recordIp
            return 0
        ;;
        *)
            echo "Get Record Info Failed!"
            return 1
        ;;
    esac

}

# Update Domain Ip
# Arg: main-domain sub-domain

arDdnsUpdate() {

    local domainId
    local recordId
    local recordRs
    local recordIp
    local recordCd

    local hostIp=$(arWanIp)

    # Get domain ID
    domainId=$(arDdnsApi "Domain.Info" "domain=$1")
    domainId=$(echo $domainId | sed 's/.*"id":"\([0-9]*\)".*/\1/')

    # Get Record ID
    recordId=$(arDdnsApi "Record.List" "domain_id=$domainId&sub_domain=$2&record_type=A")
    recordId=$(echo $recordId | sed 's/.*"id":"\([0-9]*\)".*/\1/')

    # Update IP
    recordRs=$(arDdnsApi "Record.Ddns" "domain_id=$domainId&record_id=$recordId&sub_domain=$2&record_type=A&value=$hostIp&record_line=%e9%bb%98%e8%ae%a4")
    recordIp=$(echo $recordRs | sed 's/.*,"value":"\([0-9\.]*\)".*/\1/')
    recordCd=$(echo $recordRs | sed 's/.*{"code":"\([0-9]*\)".*/\1/')

    # Output IP
    if [ "$recordIp" = "$hostIp" ]; then
        if [ "$recordCd" = "1" ]; then
            echo $recordIp
            return 0
        fi
        # Echo error message
        echo $recordRs | sed 's/.*,"message":"\([^"]*\)".*/\1/'
        return 1
    else
        echo "Update Failed! Please check your network."
        return 1
    fi

}

# DDNS Check
# Arg: Main Sub
arDdnsCheck() {

    local postRs
    local lastIP

    local hostIp=$(arWanIp)

    echo "Updating Domain: $2.$1"
    echo "Host Ip: $hostIp"

    lastIP=$(arDdnsInfo "$1" "$2")
    if [ $? -eq 0 ]; then
        echo "lastIP: $lastIP"
        if [ "$lastIP" != "$hostIp" ]; then
            postRs=$(arDdnsUpdate "$1" "$2")
            if [ $? -eq 0 ]; then
                echo "postRs: $postRs"
                return 0
            else
                echo "$postRs"
                return 1
            fi
        fi
        echo "Last IP is the same as current IP!"
        return 1
    fi

    echo "$lastIP"
    return 1

}
#!/bin/sh
#

# Import ardnspod functions
# . /your_real_path/ardnspod

# Combine your token ID and token together as follows
arToken="1000000,7dsfwerwerwefcdcxhtrsd43523483faec"

# Place each domain you want to check as follows
# you can have multiple arDdnsCheck blocks
arDdnsCheck "" "www"
